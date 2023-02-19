# NextRJ Utilities

The utilities for `path`, `string`.

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

**Truncate string:**

```ts
import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
import { truncate } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"

const source = "z±" // z = 1 byte, ± = 2 bytes"
// default truncate by max-byte-length
assertStrictEquals(truncate(source, 2), "z")
assertStrictEquals(truncate(source, 3), "z±")
// truncate by max-code-point-length
assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
assertStrictEquals(truncate(source, 2, { byByte: false }), "z±")
const source = "z中" // z = 1 byte, 中 = 3 bytes"
// default truncate by max-byte-length
assertStrictEquals(truncate(source, 3), "z")
assertStrictEquals(truncate(source, 4), "z中")
// truncate by max-code-point-length
assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
assertStrictEquals(truncate(source, 2, { byByte: false }), "z中")
const source = "z🦄" // z = 1 byte, 🦄 = 4 bytes"
// default truncate by max-byte-length
assertStrictEquals(truncate(source, 4), "z")
assertStrictEquals(truncate(source, 5), "z🦄")
// truncate by max-code-point-length
assertStrictEquals(truncate(source, 1, { byByte: false }), "z")
assertStrictEquals(truncate(source, 2, { byByte: false }), "z🦄")
```

**Format string template:**

```ts
import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
import { format } from "https://deno.land/x/nextrj_utils@$VERSION/string.ts"

assertStrictEquals(format("${a} / ${b}", { a: 50, b: 100 }), "50 / 100")

const f = (v: number): number => ++v
assertStrictEquals(format("${v}-${f(1)}", { v: 1, f }), "1-2")
```
