// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, assertThrows } from "./deps.ts"
import { columnCount, MaxLenType, truncate } from "./string.ts"

Deno.test("maxLen < 0 should throw error", () => {
  assertThrows(() => truncate("abc", -1), Error, "Argument 'maxLen' should greater than 0.")
})

Deno.test("truncate empty string", () => {
  const source = ""
  assertStrictEquals(truncate(source, 0), source)
  assertStrictEquals(truncate(source, 10), source)
  assertStrictEquals(truncate(source, 10, MaxLenType.MaxColumnCount), source)
  assertStrictEquals(truncate(source, 10, MaxLenType.MaxByteLength), source)
  assertStrictEquals(truncate(source, 10, MaxLenType.MaxWordCount), source)
})

Deno.test("truncate 1 byte 1 column string", () => {
  const source = "a1"

  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "a")
  assertStrictEquals(truncate(source, 2), "a1")
  assertStrictEquals(truncate(source, 3), "a1")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxColumnCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxColumnCount), "a1")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxColumnCount), "a1")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxByteLength), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxByteLength), "a1")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxByteLength), "a1")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxWordCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxWordCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxWordCount), "a1")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxWordCount), "a1")
})

Deno.test("truncate 2 bytes 1 column string", () => {
  const source = "a±" // a = 1 byte 1 column, ± = 2 bytes 1 column"

  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "a")
  assertStrictEquals(truncate(source, 2), "a±")
  assertStrictEquals(truncate(source, 3), "a±")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxColumnCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxColumnCount), "a±")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxColumnCount), "a±")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxByteLength), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxByteLength), "a±")
  assertStrictEquals(truncate(source, 4, MaxLenType.MaxByteLength), "a±")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxWordCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxWordCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxWordCount), "a±")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxWordCount), "a±")
})

Deno.test("truncate 3 bytes 2 column string", () => {
  const source = "a中" // a = 1 byte 1 column, 中 = 3 bytes 2 column"

  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "a")
  assertStrictEquals(truncate(source, 2), "a")
  assertStrictEquals(truncate(source, 3), "a中")
  assertStrictEquals(truncate(source, 4), "a中")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxColumnCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxColumnCount), "a中")
  assertStrictEquals(truncate(source, 4, MaxLenType.MaxColumnCount), "a中")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxByteLength), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 4, MaxLenType.MaxByteLength), "a中")
  assertStrictEquals(truncate(source, 5, MaxLenType.MaxByteLength), "a中")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxWordCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxWordCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxWordCount), "a中")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxWordCount), "a中")
})

Deno.test("truncate 4 bytes 2 column string", () => {
  const source = "a🦄" // a = 1 byte 1 column, 🦄 = 4 bytes 2 column"

  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "a")
  assertStrictEquals(truncate(source, 2), "a")
  assertStrictEquals(truncate(source, 3), "a🦄")
  assertStrictEquals(truncate(source, 4), "a🦄")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxColumnCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxColumnCount), "a")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxColumnCount), "a🦄")
  assertStrictEquals(truncate(source, 4, MaxLenType.MaxColumnCount), "a🦄")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxByteLength), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 4, MaxLenType.MaxByteLength), "a")
  assertStrictEquals(truncate(source, 5, MaxLenType.MaxByteLength), "a🦄")
  assertStrictEquals(truncate(source, 6, MaxLenType.MaxByteLength), "a🦄")

  assertStrictEquals(truncate(source, 0, MaxLenType.MaxWordCount), "")
  assertStrictEquals(truncate(source, 1, MaxLenType.MaxWordCount), "a")
  assertStrictEquals(truncate(source, 2, MaxLenType.MaxWordCount), "a🦄")
  assertStrictEquals(truncate(source, 3, MaxLenType.MaxWordCount), "a🦄")
})

Deno.test("truncate long string to max-column-count", () => {
  // they should all have the very similar visable width
  const maxLen = 10
  console.log(truncate("=".repeat(1000), maxLen))
  console.log(truncate("±".repeat(1000), maxLen))
  console.log(truncate("★".repeat(1000), maxLen))
  console.log(truncate("中".repeat(1000), maxLen))
  console.log(truncate("🦄".repeat(1000), maxLen))
  console.log(truncate("🦄".repeat(1000), maxLen))
  console.log(truncate("=中±🦄±中=".repeat(1000), maxLen))
})
