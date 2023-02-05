// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, dirname } from "./deps.ts"
import { existsSync } from "./path.ts"

const file = "temp/test_file.txt"
const directory = "temp/test_dir"

Deno.test(function fileNotExistsSync() {
  try {
    Deno.removeSync(file)
    // deno-lint-ignore no-empty
  } catch (_) {}

  const fileExists = existsSync(file)
  assertStrictEquals(fileExists, false)
})

Deno.test(function fileExistsSync() {
  try {
    Deno.mkdirSync(dirname(file))
    Deno.removeSync(file)
    // deno-lint-ignore no-empty
  } catch (_) {}

  Deno.writeTextFileSync(file, "")
  const fileExists = existsSync(file)
  assertStrictEquals(fileExists, true)
})

Deno.test(function directoryNotExistsSync() {
  try {
    Deno.removeSync(directory, { recursive: true })
    // deno-lint-ignore no-empty
  } catch (_) {}

  const directoryExists = existsSync(directory)
  assertStrictEquals(directoryExists, false)
})

Deno.test(function directoryExistsSync() {
  try {
    Deno.removeSync(directory, { recursive: true })
    // deno-lint-ignore no-empty
  } catch (_) {}

  Deno.mkdirSync(directory, { recursive: true })
  const directoryExists = existsSync(directory)
  assertStrictEquals(directoryExists, true)
})
