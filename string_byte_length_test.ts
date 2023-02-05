// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { byteLength } from "./string.ts"

Deno.test(function test() {
  // more detail benchmarks on https://github.com/ehmicky/string-byte-length
  assertStrictEquals(byteLength(""), 0)
  assertStrictEquals(byteLength(" "), 1)
  assertStrictEquals(byteLength("\0"), 1)
  assertStrictEquals(byteLength("a"), 1)
  assertStrictEquals(byteLength("A"), 1)
  assertStrictEquals(byteLength("1"), 1)
  assertStrictEquals(byteLength("±"), 2)
  assertStrictEquals(byteLength("★"), 3)
  assertStrictEquals(byteLength("中"), 3)
  assertStrictEquals(byteLength("🦄"), 4)
})
