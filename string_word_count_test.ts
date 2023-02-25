// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { wordCount } from "./string.ts"

Deno.test(function test() {
  // knowledge from https://blog.bitsrc.io/how-big-is-a-string-ef2af3d222e6
  assertStrictEquals(wordCount(""), 0)
  assertStrictEquals(wordCount(" "), 1)
  assertStrictEquals(wordCount("a"), 1)
  assertStrictEquals(wordCount("A"), 1)
  assertStrictEquals(wordCount("1"), 1)
  assertStrictEquals(wordCount("±"), 1)
  assertStrictEquals(wordCount("★"), 1)
  assertStrictEquals(wordCount("中"), 1)
  assertStrictEquals(wordCount("🦄"), 1)
  assertStrictEquals(wordCount("\0"), 1)
  assertStrictEquals(wordCount("\r"), 1)
  assertStrictEquals(wordCount("\n"), 1)
  assertStrictEquals(wordCount("\n"), 1)
  assertStrictEquals(wordCount("\r\n"), 2)
})
