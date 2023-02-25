# NextRJ Utilities

The utilities for `path`, `string`, `duration`.

## Usage

### Path functions

```ts
import { exists, existsSync } from "https://deno.land/x/nextrj_utils@$VERSION/path.ts"
const pathExists = await exists("./foo/bar")
const pathExistsSync = existsSync("./foo/bar")
console.log(pathExists) // true or false
console.log(pathExistsSync) // true or false
```

### String functions

**Format string template:**

```ts
import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
import { format } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"

assertStrictEquals(format("${a} / ${b}", { a: 50, b: 100 }), "50 / 100")

const f = (v: number): number => ++v
assertStrictEquals(format("${v}-${f(1)}", { v: 1, f }), "1-2")
```

**Truncate string:**

```ts
import { truncate } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"

const maxLen = 10
// defaults truncate by max-column-count for better match visable with.
console.log(truncate("=".repeat(1000), maxLen))
console.log(truncate("±".repeat(1000), maxLen))
console.log(truncate("★".repeat(1000), maxLen))
console.log(truncate("中".repeat(1000), maxLen))
console.log(truncate("🦄".repeat(1000), maxLen))
console.log(truncate("🦄".repeat(1000), maxLen))
console.log(truncate("=中±🦄±中=".repeat(1000), maxLen))

// they should all have the very similar visable width in the terminal:
------- output -------
==========
±±±±±±±±±±
★★★★★★★★★★
中中中中中
🦄🦄🦄🦄🦄
🦄🦄🦄🦄🦄
=中±🦄±中=
----- output end -----
```

### Format seconds to duration

```ts
import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
import { format } from "https://deno.land/x/nextrj_utils@$VERSION/duration.ts"

// mm:ss
assertStrictEquals(format(15), "00:15")
assertStrictEquals(format(2 * 60 + 15), "02:15")

// hh:mm:ss
assertStrictEquals(format(13 * 60 * 60 + 2 * 60 + 15), "13:02:15")
assertStrictEquals(format(24 * 60 * 60 + 2 * 60 + 15), "24:02:15")
```
