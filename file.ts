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

import { writeAll } from "./deps.ts"

export type FetcherInit = {
  to?: string
  on?: {
    start?: (total: number) => void
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
  async fetch(): Promise<void> {
    const response = await fetch(this.#from, this.#options?.fetchOptions)
    if (response.body) {
      // get filesize from header
      let total = -1
      if (response.headers.has("Content-Length")) {
        total = parseInt(response.headers.get("Content-Length")!)
      }

      // pipe body to file
      const toFile: Deno.FsFile = await Deno.open(
        this.#options?.to ||
          // get filename from header
          response.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1] ||
          // get from url
          getLastPathName(this.#from) ||
          // default filename
          "unknown",
        { write: true, create: true },
      )
      const fetcher = this as Fetcher
      let received = 0 // sum chunk.byteLength
      const writableStream = new WritableStream({
        start(_controller) {
          // call start callback
          fetcher.#options?.on?.start?.call(this, total)
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
      await response.body.pipeTo(writableStream)
    } else {
      throw new Error("The response's body is undefined or null.")
    }
  }
}

/**
 * Extract the last path name from the url.
 *
 * throw {@link TypeError} if url is not a regular url.
 *
 * Examples:
 * - "https://test.com/xxx" > "xxx"
 * - "https://test.com/xxx/" > "xxx"
 * - "file://path/to/xxx" > "xxx"
 * - "file://path/to/xxx/" > "xxx"
 */
export function getLastPathName(url: string): string {
  let pathname
  try {
    // consider url is a regular url, like 'http://...', 'file://...'
    pathname = new URL(url).pathname
  } catch {
    // consider url is a regular path
    pathname = url
  }
  return pathname.split("/").filter(Boolean).pop() as string
}