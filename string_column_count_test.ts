// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { columnCount } from "./string.ts"

Deno.test(function test() {
  // see https://www.npmjs.com/package/string-width
  assertStrictEquals(columnCount(""), 0)
  assertStrictEquals(columnCount(" "), 1)
  assertStrictEquals(columnCount("a"), 1)
  assertStrictEquals(columnCount("A"), 1)
  assertStrictEquals(columnCount("1"), 1)
  assertStrictEquals(columnCount("±"), 1)
  assertStrictEquals(columnCount("★"), 1)
  assertStrictEquals(columnCount("中"), 2)
  assertStrictEquals(columnCount("🦄"), 2)

  assertStrictEquals(columnCount("\0"), 0)
  assertStrictEquals(columnCount("\r"), 0)
  assertStrictEquals(columnCount("\n"), 0)
  assertStrictEquals(columnCount("\n"), 0)
  assertStrictEquals(columnCount("\r\n"), 0)

  assertStrictEquals(columnCount("\u001B[1m中\u001B[22m"), 2)
})
