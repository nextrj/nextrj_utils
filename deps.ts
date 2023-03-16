// Copyright 2023 the NextRJ organization. All Rights Reserved. MIT license.

// deno standard library
export { assertStrictEquals, assertThrows } from "https://deno.land/std@0.180.0/testing/asserts.ts"
export { dirname, extname, join as joinPath } from "https://deno.land/std@0.180.0/path/mod.ts"
export { writeAll } from "https://deno.land/std@0.180.0/streams/mod.ts"
export { extension } from "https://deno.land/std@0.180.0/media_types/mod.ts"

// 3-parts
import stringWidth from "https://cdn.skypack.dev/string-width@5.1.2"
export { stringWidth }
// similar with `import stringWidth from "npm:string-width@5.1.2"`

// npm
import * as contentDisposition from "npm:content-disposition@0.5.4"
export const paseContentDisposition = contentDisposition.parse
