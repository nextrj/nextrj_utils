// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, assertThrows } from "./deps.ts"
import { format } from "./string.ts"

Deno.test("just inside params", () => {
  assertStrictEquals(format("${a} / ${b}", { a: 50, b: 100 }), "50 / 100")
})

// declare a global variable `c` in window
declare global {
  interface Window {
    c: string
  }
}
Deno.test("with global variable", () => {
  window.c = "50%"
  assertStrictEquals(format("${a} / ${b} = ${c}", { a: 50, b: 100 }), "50 / 100 = 50%")
})

Deno.test("with function", () => {
  const f = (v: number): number => ++v
  assertStrictEquals(format("${v}-${f(1)}", { v: 1, f }), "1-2")
})

Deno.test("should throw ReferenceError", () => {
  assertThrows(() => format("${a}, ${b}", { a: 1 }), ReferenceError, "b is not defined")
})
