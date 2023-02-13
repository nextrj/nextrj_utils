// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.
import { assertStrictEquals } from "./deps.ts"
import { TerminalProgressBar as Bar } from "./terminal_progress_bar.ts"

Deno.test(async function keepState() {
  await doBar(true)
  console.log("<<<<")
})

Deno.test(async function notKeepState() {
  await doBar(false)
  console.log("<<<<")
})

function doBar(keepState: boolean): Promise<void> {
  return new Promise((resolve) => {
    // Initial the bar
    Bar.init()
    assertStrictEquals(Bar.value, 0)
    assertStrictEquals(Bar.total, 100)
    assertStrictEquals(Bar.title, undefined)

    let count = 0
    const intervalId = setInterval(() => {
      // step the bar progress to specified status
      Bar.to(++count)
      assertStrictEquals(Bar.value, count)

      if (Bar.completed) {
        clearInterval(intervalId)
        Bar.clear(keepState)

        assertStrictEquals(count, 100)
        assertStrictEquals(Bar.value, 100)
        assertStrictEquals(Bar.total, 100)
        assertStrictEquals(Bar.title, undefined)

        resolve()
      }
    }, 1)
  })
}

// Deno.test(function complex() {
//   // Initial the bar
//   Bar.init({
//     value: 0,
//     total: 100,
//     title: "",
//   })
//   assertStrictEquals(Bar.value, 0)
//   assertStrictEquals(Bar.total, 100)

//   let couter = 0
//   const id = setInterval(() => {
//     // step the bar progress to specified status
//     Bar.to({
//       value: ++couter,
//     })
//     assertStrictEquals(Bar.value, couter)

//     if (Bar.completed) {
//       clearInterval(id)

//       // reset the bar
//       Bar.clear(true)
//       assertStrictEquals(Bar.value, 0)
//       assertStrictEquals(Bar.total, 100)
//     }
//   }, 100)
// })
