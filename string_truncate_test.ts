// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, assertThrows } from "./deps.ts"
import { columnCount, MaxLenType, truncate, truncateFilename } from "./string.ts"

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

Deno.test("truncate filename", () => {
  const maxLen = 10

  let fileName = "123456789.zip"
  // at lease return "1...9.zip"
  assertStrictEquals(truncateFilename(fileName, 1), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 2), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 3), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 4), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 5), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 6), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 7), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 8), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, 9), "1...9.zip")
  assertStrictEquals(truncateFilename(fileName, maxLen), "12...9.zip")

  fileName = "a/1234567.zip"
  assertStrictEquals(truncateFilename(fileName, maxLen), "a/...7.zip")
  assertStrictEquals(truncateFilename(fileName, maxLen + 1), "a/1...7.zip")

  fileName = "1234567🦄.zip"
  assertStrictEquals(truncateFilename(fileName, maxLen), "1...🦄.zip")

  fileName = "a/1234567🦄.zip"
  assertStrictEquals(truncateFilename(fileName, maxLen), "a...🦄.zip")
  assertStrictEquals(truncateFilename(fileName, maxLen + 1), "a/...🦄.zip")
  assertStrictEquals(truncateFilename(fileName, maxLen + 2), "a/1...🦄.zip")
})

Deno.test("truncate filename edge", () => {
  const fileName = "spring-boot-reference.pdf"
  const fileNameLen = columnCount(fileName)
  assertStrictEquals(fileNameLen, 25)
  assertStrictEquals(truncateFilename("spring-boot-reference.pdf", fileNameLen), "spring-boot-reference.pdf")
  assertStrictEquals(truncateFilename("spring-boot-reference.pdf", fileNameLen - 1), "spring-boot-refe...e.pdf")
})
