// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * Utilities for string.
 *
 * Example for format string template:
 *
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
 * import { format } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"
 *
 * assertStrictEquals(format("${a} / ${b}", { a: 50, b: 100 }), "50 / 100")
 *
 * const f = (v: number): number => ++v
 * assertStrictEquals(format("${v}-${f(1)}", { v: 1, f }), "1-2")
 * ```
 *
 * Example for truncate string:
 *
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
 * import { truncate } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"
 *
 * const maxLen = 10
 * console.log(truncate("=".repeat(1000), maxLen))
 * console.log(truncate("±".repeat(1000), maxLen))
 * console.log(truncate("★".repeat(1000), maxLen))
 * console.log(truncate("中".repeat(1000), maxLen))
 * console.log(truncate("🦄".repeat(1000), maxLen))
 * console.log(truncate("🦄".repeat(1000), maxLen))
 * console.log(truncate("=中±🦄±中=".repeat(1000), maxLen))
 *
 * // they should all have the very similar visable width in the terminal:
 * ------- output -------
 * ==========
 * ±±±±±±±±±±
 * ★★★★★★★★★★
 * 中中中中中
 * 🦄🦄🦄🦄🦄
 * 🦄🦄🦄🦄🦄
 * =中±🦄±中=
 * ----- output end -----
 * ```
 *
 * @module
 */

import { stringWidth } from "./deps.ts"

// only for UTF8 https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const textEncoder = new TextEncoder()

/**
 * Count the number of words in a string.
 * One word (even multi-byte string) has one length.
 *
 * It is not the same with code-unit-length of `String.length` for multi-byte string.
 * The count is base on the code-point-length.
 * See [<How big is a JavaScript string?>](https://blog.bitsrc.io/how-big-is-a-string-ef2af3d222e6).
 *
 * - wordCount("a中🦄") // 3
 * - comparison with code-unit-length:
 *     - "a中🦄".length // 4
 *     - "a".length // 1
 *     - "中".length // 1
 *     - "🦄".length // 2
 */
export function wordCount(source: string): number {
  // same with `Array.from(source).length`
  return [...source].length
}

/**
 * Count the visable width of a string. Similar with terminal columns.
 *
 * - ASCII character has 1 with.
 * - Chiness character and Emoji have 2 width.
 *
 * - columnCount("a") // 1
 * - columnCount("±") // 1
 * - columnCount("中") // 2
 * - columnCount("🦄") // 2
 */
export function columnCount(source: string): number {
  return stringWidth(source)
}

/**
 * Get the specified `source` string's byte-length.
 *
 * - byteLength("a") // 1
 * - byteLength("±") // 2
 * - byteLength("★") // 3
 * - byteLength("中") // 3
 * - byteLength("🦄") // 4
 */
export function byteLength(source: string): number {
  return textEncoder.encode(source).length
}

export enum MaxLenType {
  MaxColumnCount,
  MaxByteLength,
  MaxWordCount,
}

/**
 * Truncate the specified `source` string to a max-length string.
 * Defaults truncate by max-column-count for better match visable with.
 */
export function truncate(
  source: string,
  maxLen: number,
  maxLenType: MaxLenType = MaxLenType.MaxColumnCount,
): string {
  if (source.length === 0) return source
  if (maxLen < 0) throw new Error(`Argument 'maxLen' should greater than 0.`)

  // split source to code array by code-point.
  // don't use `source.split("")` because it use code-unit-length.
  // see https://blog.bitsrc.io/how-big-is-a-string-ef2af3d222e6
  const codes = [...source]
  const codesLen = codes.length

  // truncate it
  if (maxLenType === MaxLenType.MaxColumnCount) { // truncate by max-column-count
    if (columnCount(source) > maxLen) {
      const ss = []
      let count = 0
      for (const code of codes) {
        // console.log("code=" + code)
        count += columnCount(code)
        if (count <= maxLen) ss.push(code)
        else break
      }
      return ss.join("")
    } else return source
  } else if (maxLenType === MaxLenType.MaxByteLength) { // truncate by max-byte-length
    if (byteLength(source) > maxLen) {
      const ss = []
      let count = 0
      for (const code of codes) {
        count += byteLength(code)
        if (count <= maxLen) ss.push(code)
        else break
      }
      return ss.join("")
    } else return source
  } else if (maxLenType === MaxLenType.MaxWordCount) { // truncate by max-code-point-length
    if (codesLen > maxLen) return codes.slice(0, maxLen).join("")
    else return source
  } else throw new Error(`Unsupport maxLenType of '${maxLenType}'`)
}

/**
 * Format the {@link template} with the specific {@link params}.
 *
 * Example:
 * ```ts
 * format("${a}/${b}", {a: 50, b: 100}) // "50/100"
 * ```
 */
export function format(template: string, params: Record<string, unknown>): string {
  const fn = new Function(...Object.keys(params), "return `" + template + "`;")
  return fn(...Object.values(params))
}
