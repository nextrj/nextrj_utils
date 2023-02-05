// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { truncate } from "./string.ts"

Deno.test(function truncateEmptyString() {
  const source = ""

  // default truncate by max-byte-length
  assertStrictEquals(truncate(source, -1), "")
  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "")

  // truncate by max-code-point-length
  assertStrictEquals(truncate(source, -1, { byByte: false }), "")
  assertStrictEquals(truncate(source, 0, { byByte: false }), "")
  assertStrictEquals(truncate(source, 1, { byByte: false }), "")
})

Deno.test(function truncateSingleByteString() {
  const source = "12"

  // default truncate by max-byte-length
  assertStrictEquals(truncate(source, -1), "")
  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "1")
  assertStrictEquals(truncate(source, 2), "12")
  assertStrictEquals(truncate(source, 3), "12")

  // truncate by max-code-point-length
  assertStrictEquals(truncate(source, -1, { byByte: false }), "")
  assertStrictEquals(truncate(source, 0, { byByte: false }), "")
  assertStrictEquals(truncate(source, 1, { byByte: false }), "1")
  assertStrictEquals(truncate(source, 2, { byByte: false }), "12")
  assertStrictEquals(truncate(source, 3, { byByte: false }), "12")
})

Deno.test(function truncateTwoByteString() {
  const source = "z±" // z = 1 byte, ± = 2 bytes"

  // default truncate by max-byte-length
  assertStrictEquals(truncate(source, -1), "")
  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "z")
  assertStrictEquals(truncate(source, 2), "z")
  assertStrictEquals(truncate(source, 3), "z±")
  assertStrictEquals(truncate(source, 4), "z±")

  // truncate by max-code-point-length
  assertStrictEquals(truncate(source, -1, { byByte: false }), "")
  assertStrictEquals(truncate(source, 0, { byByte: false }), "")
  assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
  assertStrictEquals(truncate(source, 2, { byByte: false }), "z±")
  assertStrictEquals(truncate(source, 3, { byByte: false }), "z±")
})

Deno.test(function truncateThreeByteString() {
  const source = "z中" // z = 1 byte, 中 = 3 bytes"

  // default truncate by max-byte-length
  assertStrictEquals(truncate(source, -1), "")
  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "z")
  assertStrictEquals(truncate(source, 2), "z")
  assertStrictEquals(truncate(source, 3), "z")
  assertStrictEquals(truncate(source, 4), "z中")
  assertStrictEquals(truncate(source, 5), "z中")

  // truncate by max-code-point-length
  assertStrictEquals(truncate(source, -1, { byByte: false }), "")
  assertStrictEquals(truncate(source, 0, { byByte: false }), "")
  assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
  assertStrictEquals(truncate(source, 2, { byByte: false }), "z中")
  assertStrictEquals(truncate(source, 3, { byByte: false }), "z中")
})

Deno.test(function truncateFourByteString() {
  const source = "z🦄" // z = 1 byte, 🦄 = 4 bytes"

  // default truncate by max-byte-length
  assertStrictEquals(truncate(source, -1), "")
  assertStrictEquals(truncate(source, 0), "")
  assertStrictEquals(truncate(source, 1), "z")
  assertStrictEquals(truncate(source, 2), "z")
  assertStrictEquals(truncate(source, 3), "z")
  assertStrictEquals(truncate(source, 4), "z")
  assertStrictEquals(truncate(source, 5), "z🦄")
  assertStrictEquals(truncate(source, 6), "z🦄")

  // truncate by max-code-point-length
  assertStrictEquals(truncate(source, -1, { byByte: false }), "")
  assertStrictEquals(truncate(source, 0, { byByte: false }), "")
  assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
  assertStrictEquals(truncate(source, 2, { byByte: false }), "z🦄")
  assertStrictEquals(truncate(source, 3, { byByte: false }), "z🦄")
  assertStrictEquals(truncate(source, 4, { byByte: false }), "z🦄")
})
