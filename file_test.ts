// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals, joinPath } from "./deps.ts"
import { existsSync } from "./path.ts"
import { Fetcher, getLastPathName } from "./file.ts"

Deno.test("get last path name", () => {
  // url
  assertStrictEquals(getLastPathName("https://test.com/xxx"), "xxx")
  assertStrictEquals(getLastPathName("https://test.com/xxx/"), "xxx")
  assertStrictEquals(getLastPathName("file://test.com/xxx"), "xxx")
  assertStrictEquals(getLastPathName("file://test.com/xxx/"), "xxx")

  // path
  assertStrictEquals(getLastPathName("/test.com/xxx.y"), "xxx.y")
  assertStrictEquals(getLastPathName("/test.com/xxx.y/"), "xxx.y")
  assertStrictEquals(getLastPathName("test.com/xxx.y"), "xxx.y")
  assertStrictEquals(getLastPathName("test.com/xxx.y/"), "xxx.y")
  assertStrictEquals(getLastPathName("abc"), "abc")
})

Deno.test("fetch to default filename", async () => {
  const from = "assets/string_truncate_01.png"
  const to = "string_truncate_01.png" // extract from url
  const total = Deno.statSync(from).size

  // clean
  if (existsSync(to)) Deno.removeSync(to)

  // fetch
  let callStart = 0, callReceived = 0, callEnd = 0
  const fetcher = new Fetcher(
    `file://${Deno.realPathSync(from)}`,
    {
      on: {
        start(total: number) {
          //console.log(`start: total=${total}`)
          callStart++
          assertStrictEquals(total, -1)
        },
        received(received: number, total: number) {
          //console.log(`received: received=${received}, total=${total}`)
          callReceived = received
          assertStrictEquals(total, -1)
          assertStrictEquals(received > 0, true)
        },
        end(success: boolean) {
          //console.log(`end: success=${success}`)
          callEnd++
          assertStrictEquals(success, true)
        },
      },
    },
  )
  await fetcher.fetch()

  // verify
  assertStrictEquals(existsSync(to), true)
  assertStrictEquals(Deno.statSync(to).size, total)
  assertStrictEquals(callStart, 1)
  assertStrictEquals(callEnd, 1)
  assertStrictEquals(callReceived, total)

  // clean
  Deno.removeSync(to)
})

Deno.test("fetch to specific filename", async () => {
  const from = "file.ts"
  const to = joinPath("temp", from)
  const total = Deno.statSync(from).size

  // clean
  if (existsSync(to)) Deno.removeSync(to)

  // fetch
  let callStart = 0, callReceived = 0, callEnd = 0
  const fetcher = new Fetcher(
    `file://${Deno.realPathSync(from)}`,
    {
      to,
      on: {
        start(total: number) {
          callStart++
          assertStrictEquals(total, -1)
        },
        received(received: number, total: number) {
          callReceived = received
          assertStrictEquals(total, -1)
          assertStrictEquals(received > 0, true)
        },
        end(success: boolean) {
          callEnd++
          assertStrictEquals(success, true)
        },
      },
    },
  )
  await fetcher.fetch()

  // verify
  assertStrictEquals(existsSync(to), true)
  assertStrictEquals(Deno.statSync(to).size, total)
  assertStrictEquals(callStart, 1)
  assertStrictEquals(callEnd, 1)
  assertStrictEquals(callReceived, total)

  // clean
  Deno.removeSync(to)
})

Deno.test("fetch remote file", async () => {
  const from = "https://docs.spring.io/spring-framework/docs/6.0.6/reference/pdf/spring-framework.pdf"
  const to = joinPath("temp", "spring-framework.pdf")
  const total = 20814747

  // clean
  if (existsSync(to)) Deno.removeSync(to)

  // fetch
  let callStart = 0, callReceived = 0, callEnd = 0
  const fetcher = new Fetcher(
    from,
    {
      to,
      on: {
        start(total: number) {
          callStart++
          assertStrictEquals(total, total)
        },
        received(received: number, total: number) {
          callReceived = received
          assertStrictEquals(total, total)
          assertStrictEquals(received > 0, true)
        },
        end(success: boolean) {
          callEnd++
          assertStrictEquals(success, true)
        },
      },
    },
  )
  await fetcher.fetch()

  // verify
  assertStrictEquals(existsSync(to), true)
  assertStrictEquals(Deno.statSync(to).size, total)
  assertStrictEquals(callStart, 1)
  assertStrictEquals(callEnd, 1)
  assertStrictEquals(callReceived, total)

  // clean
  Deno.removeSync(to)
})
