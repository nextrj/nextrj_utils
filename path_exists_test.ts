// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, dirname } from "./deps.ts"
import { existsSync } from "./path.ts"

const file = "temp/test_file.txt"
const directory = "temp/test_dir"

Deno.test(async function fileNotExists() {
  try {
    await Deno.remove(file)
    // deno-lint-ignore no-empty
  } catch (_) {}

  const fileExists = await existsSync(file)
  assertStrictEquals(fileExists, false)
})

Deno.test(async function fileExists() {
  try {
    Deno.mkdirSync(dirname(file))
    await Deno.remove(file)
    // deno-lint-ignore no-empty
  } catch (_) {}

  await Deno.writeTextFile(file, "")
  const fileExists = await existsSync(file)
  assertStrictEquals(fileExists, true)
})

Deno.test(async function directoryNotExists() {
  try {
    await Deno.remove(directory, { recursive: true })
    // deno-lint-ignore no-empty
  } catch (_) {}

  const directoryExists = await existsSync(directory)
  assertStrictEquals(directoryExists, false)
})

Deno.test(async function directoryExists() {
  try {
    await Deno.remove(directory, { recursive: true })
    // deno-lint-ignore no-empty
  } catch (_) {}

  await Deno.mkdir(directory, { recursive: true })
  const directoryExists = await existsSync(directory)
  assertStrictEquals(directoryExists, true)
})
