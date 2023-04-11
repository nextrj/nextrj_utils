// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { parse } from "./jsonp.ts"

Deno.test("parse to string", () => {
  assertStrictEquals(parse('callback("abc")'), "abc")
})

Deno.test("parse to boolean", () => {
  assertStrictEquals(parse("callback(true)"), true)
  assertStrictEquals(parse("callback(false)"), false)
})

Deno.test("parse to number", () => {
  assertStrictEquals(parse("callback(2)"), 2)
  assertStrictEquals(parse("callback(1.01)"), 1.01)
})

Deno.test("parse to jsonArray", () => {
  const array = parse("callback([1, 2])") as Array<number>
  assertStrictEquals(array[0], 1)
  assertStrictEquals(array[1], 2)
  assertStrictEquals(array.length, 2)
})

Deno.test("parse to jsonObject", () => {
  const j = parse("callback({ok: true})") as Record<string, boolean>
  assertStrictEquals(j.ok, true)
})
