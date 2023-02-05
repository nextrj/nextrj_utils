// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { codePointLength } from "./string.ts"

Deno.test(function test() {
  // knowledge from https://blog.bitsrc.io/how-big-is-a-string-ef2af3d222e6
  assertStrictEquals(codePointLength(""), 0)
  assertStrictEquals(codePointLength(" "), 1)
  assertStrictEquals(codePointLength("\0"), 1)
  assertStrictEquals(codePointLength("a"), 1)
  assertStrictEquals(codePointLength("A"), 1)
  assertStrictEquals(codePointLength("1"), 1)
  assertStrictEquals(codePointLength("±"), 1)
  assertStrictEquals(codePointLength("★"), 1)
  assertStrictEquals(codePointLength("中"), 1)
  assertStrictEquals(codePointLength("🦄"), 1)
})
