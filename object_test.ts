// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { recursiveAssign } from "./object.js"

Deno.test("no nested object", () => {
  const obj1 = { name: "test1", denug: true, num: 1, id: 1 }
  const obj2 = { name: "test2", denug: false, num: 2, ext: "more" }
  const obj3 = recursiveAssign({}, obj1, obj2)
  assertStrictEquals(obj3 === obj1, false)
  assertStrictEquals(obj3.id, obj1.id)
  assertStrictEquals(obj3.name, obj2.name)
  assertStrictEquals(obj3.denug, obj2.denug)
  assertStrictEquals(obj3.num, obj2.num)
  assertStrictEquals(obj3.ext, "more")

  const obj4 = recursiveAssign(obj1, obj2)
  assertStrictEquals(obj4, obj1)
})

Deno.test("nested object", () => {
  const obj1 = { nested: { name: "test1", denug: true, num: 1, id: 1 } }
  const obj2 = { nested: { name: "test2", denug: false, num: 2, ext: "more" } }
  const obj3 = recursiveAssign({}, obj1, obj2)
  assertStrictEquals(obj3 === obj1, false)
  assertStrictEquals(obj3.nested.id, obj1.nested.id)
  assertStrictEquals(obj3.nested.name, obj2.nested.name)
  assertStrictEquals(obj3.nested.denug, obj2.nested.denug)
  assertStrictEquals(obj3.nested.num, obj2.nested.num)
  assertStrictEquals(obj3.nested.ext, "more")
})
