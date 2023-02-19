// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/** Extensions of "https://deno.land/std@$STD_VERSION/path/mod.ts".
 *
 * Codes in the examples check whether the path exists:
 *
 * ```ts
 * import { exists, existsSync } from "https://deno.land/x/nextrj_utils@$VERSION/path.ts"
 * const pathExists = await exists("./foo/bar")
 * const pathExistsSync = existsSync("./foo/bar")
 * console.log(pathExists);     // true or false
 * console.log(pathExistsSync); // true or false
 * ```
 *
 * @module
 */

/** Check whether the specified `path` exists.
 *
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category File System
 */
export async function exists(path: string | URL): Promise<boolean> {
  try {
    await Deno.lstat(path)
    return true
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return false
    else throw err
  }
}

/** Synchronously check whether the specified `path` exists.
 *
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category File System
 */
export function existsSync(path: string | URL): boolean {
  try {
    Deno.lstatSync(path)
    return true
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return false
    else throw err
  }
}
