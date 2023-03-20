// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * Fetch remote file with progress callback (start, received, end).
 *
 * Examples:
 * ```ts
 * import { Fetcher } from "https://deno.land/x/nextrj_utils@$VERSION/file.ts"
 *
 * const fetcher = new Fetcher(
 *   "https://www.example.com/test.pdf",
 *   {
 *     to: "example-test.pdf",
 *     on: {
 *       start(total: number) {
 *         console.log(`start: total=${total}`)
 *       },
 *       received(received: number, total: number) {
 *         console.log(`received: received=${received}, total=${total}`)
 *       },
 *       end(success: boolean) {
 *         console.log(`end: success=${success}`)
 *       },
 *     },
 *   },
 * )
 * await fetcher.fetch()
 * ```
 *
 * @module
 */

import { dirname, extension, joinPath, paseContentDisposition, writeAll } from "./deps.ts"
import { existsSync as pathExistsSync } from "./path.ts"
import { format as formatTemplate } from "./string.ts"

export type FetcherInit = {
  to?: string
  on?: {
    start?: (total: number, fileName: string, filePath: string) => void
    received?: (received: number, total: number) => void
    end?: (success: boolean) => void
  }
  fetchOptions?: RequestInit
}

/** A file fetcher with progress callback (start, received, end). */
export class Fetcher {
  #from: string
  #options?: FetcherInit
  constructor(from: string, options?: FetcherInit) {
    this.#from = from
    this.#options = options
  }
  /** Start fetch the file. */
  async fetch(): Promise<string> {
    const response = await fetch(this.#from, this.#options?.fetchOptions)
    if (response.ok) {
      // get file size from header
      let total = -1
      if (response.headers.has("Content-Length")) {
        total = parseInt(response.headers.get("Content-Length")!)
      }

      // get file name
      const fileName = getFileName(this.#from, response)
      // get the file full path name
      let filePath = this.#options?.to ? this.#options?.to : joinPath("temp", fileName)
      // format it: replace `\` to `/` to avoid template string erasing
      // in win os, path.join use `\` others use `/`
      filePath = formatTemplate(filePath.replace(/\\/g, "/"), { fileName: fileName })

      // create the target dir if not exists
      const fileDir = dirname(filePath)
      if (!pathExistsSync(fileDir)) await Deno.mkdir(fileDir, { recursive: true })

      // pipe body to file
      const toFile: Deno.FsFile = await Deno.open(filePath, { write: true, create: true })
      const fetcher = this as Fetcher
      let received = 0 // sum chunk.byteLength
      const writableStream = new WritableStream({
        start(_controller) {
          // call start callback
          fetcher.#options?.on?.start?.call(this, total, fileName, filePath)
        },
        async write(chunk, controller) {
          try {
            await writeAll(toFile, chunk)
            received += chunk.byteLength
            // call received callback
            fetcher.#options?.on?.received?.call(this, received, total)
          } catch (e) {
            controller.error(e)
            toFile.close()
          }
        },
        close() {
          toFile.close()
          // call end callback for finish
          fetcher.#options?.on?.end?.call(this, true)
        },
        abort() {
          toFile.close()
          // call end callback for abort
          fetcher.#options?.on?.end?.call(this, false)
        },
      })
      await response.body?.pipeTo(writableStream)
      return filePath
    } else {
      response.body?.cancel()
      throw new Error(`${response.status} ${response.statusText}`)
    }
  }
}

/**
 * Extract the last path name from the url.
 *
 * throw {@link TypeError} if url is not a regular url.
 *
 * Examples: (decodeUri=true)
 * - "https://test.com/xxx" > "xxx"
 * - "https://test.com/xxx/" > "xxx"
 * - "https://test.com/" > "test.com"
 * - "file://path/to/xxx" > "xxx"
 * - "file://path/to/xxx/" > "xxx"
 * - "file://path/" > "path"
 * - "file://path/中文" > "中文"
 *
 * Examples: (decodeUri=false|undefined)
 * - "file://path/中文" > "中文"
 */
export function getLastPathName(url: string, decodeUri = true): string {
  let pathname
  try {
    // consider url is a regular url, like 'http://...', 'file://...'
    const t = new URL(url)
    if (t.pathname === "/") return t.hostname
    else pathname = decodeUri ? decodeURIComponent(t.pathname) : t.pathname
  } catch {
    // consider url is a regular path
    pathname = decodeUri ? decodeURIComponent(url) : url
  }
  return pathname.split("/").filter(Boolean).pop() as string
}

/** Get filename param from content-disposition value. */
export function getFileNameFromContentDisposition(contentDisposition: string): string | undefined {
  try {
    const fileName = paseContentDisposition(contentDisposition)?.parameters?.filename
    // console.log(`ContentDisposition:filename=${filename}`)
    return fileName
  } catch {
    return undefined
  }
}

/**
 * Get the filename from response or request url.
 * 1. Get from content-disposition's filename* or filename param.
 * 2. Then get last path name from request url.
 * 3. Without extention, get from content-type.
 */
export function getFileName(requestUrl: string, response: Response): string {
  let fileName =
    // get from content-disposition header
    getFileNameFromContentDisposition(response.headers.get("content-disposition") || "") ||
    // get from request url
    getLastPathName(requestUrl)

  // without extention, get from content-type
  fileName = fileName.includes(".") ? fileName : `${fileName}.${extension(response.headers.get("content-type") || "")}`

  return decodeURIComponent(fileName)
}
