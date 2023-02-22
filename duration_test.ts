// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { format } from "./duration.ts"

Deno.test("format to mm:ss", () => {
  assertStrictEquals(format(15), "00:15")
  assertStrictEquals(format(2 * 60 + 15), "02:15")
})

Deno.test("format to hh:mm:ss", () => {
  assertStrictEquals(format(1 * 60 * 60 + 2 * 60 + 15), "01:02:15")
  assertStrictEquals(format(13 * 60 * 60 + 2 * 60 + 15), "13:02:15")

  // overload
  assertStrictEquals(format(24 * 60 * 60 + 2 * 60 + 15), "24:02:15")
  assertStrictEquals(format(25 * 60 * 60 + 2 * 60 + 15), "01:02:15")
})
