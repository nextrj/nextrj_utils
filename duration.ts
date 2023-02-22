// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/** Utilities for duration.
 *
 * Example for format seconds to `mm:ss` or `hh:mm:ss`:
 *
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
 * import { format } from "https://deno.land/x/nextrj_utils@$VERSION/duration.ts"
 *
 * assertStrictEquals(format(15), "00:15")
 * assertStrictEquals(format(2 * 60 + 15), "02:15")
 * assertStrictEquals(format(13 * 60 * 60 + 2 * 60 + 15), "13:02:15")
 * assertStrictEquals(format(24 * 60 * 60 + 2 * 60 + 15), "24:02:15")
 * ```
 *
 * @module
 */

const format2Hour = new Intl.DateTimeFormat("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})
const format2Minute = new Intl.DateTimeFormat("en-US", {
  minute: "2-digit",
  second: "2-digit",
})

/**
 * Auto format {@link seconds} to `mm:ss` or `hh:mm:ss`.
 *
 * Example:
 * ```ts
 * format(2 * 60 + 15) // "02:15"
 * format(1 * 60 * 60 + 2 * 60 + 15) // "01:02:15"
 * format(13 * 60 * 60 + 2 * 60 + 15) // "13:02:15"
 * ```
 */
export function format(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return (hours >= 1 ? format2Hour : format2Minute)
    .format(new Date(0, 0, 0, hours, minutes % 60, seconds % 60))
}
