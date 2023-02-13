// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/** Terminal progress bar */

export type Options = {
  value?: number
  total?: number
  title?: string
  template?: string
}

const encode = (content: string) => new TextEncoder().encode(content)

export const TerminalProgressBar = {
  title: undefined,
  value: 0,
  total: 100,
  get completed() {
    return this.value >= this.total
  },
  lastContent: "",
  percentPrecision: 2,
  template: "${bar} ${duration} ${percent} ${title} ${value}/${total}",
  init(options?: Options | number) {
    if (typeof options === "number") {
      this.value = Math.max(0, options)
      this.total = 100
    } else if (typeof options === "undefined") {
      this.value = 0
      this.total = 100
    } else throw Error("Not implements")
  },
  to(options: Options | number) {
    if (typeof options === "number") {
      this.value = Math.min(this.total, options)
    } else throw Error("Not implements")

    // generate the content
    const content = `${this.value}/${this.total}`

    // only render when content changed
    if (this.lastContent !== content) {
      this.lastContent = content
      // write text to console
      // 1. `\r` - move cursor to the left egde
      // 2. `\x1b[?25l` - hide the cursor
      // 3. `\x1b[0K` - clear from the content tail to the right edge
      Deno.stdout.writeSync(encode(`\r${content}\x1b[?25l\x1b[0K`))
    }
  },
  clear(keepState = true) {
    if (keepState) {
      // break line and show cursor, not clear last content
      // 1. `\n` - break line
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode(`\n\r\x1b[?25h`))
    } else {
      // clear content and show cursor
      // 1. `\x1b[2K` - clear content from left edge to right edge
      // 2. `\r` - move cursor to left edge
      // 3. `\x1b[?25h` - show cursor (h-height bit, l-low bit)
      Deno.stdout.writeSync(encode("\x1b[2K\r\x1b[?25h"))
    }
  },
}
