// Copyright 2023 the NextRJ organization. All rights reserved. MIT license.

/**
 * Parse the {@link jsonp} response txt to get its real value.
 *
 * Example:
 * ```ts
 * parse('calback("abc")') // "abc"
 * parse('calback("{ok: true}")') // {ok: true}
 * parse('calback("[1, 2]")') // [1, 2]
 * ```
 */
export function parse(jsonp: string, callback?: string): unknown {
  const index = jsonp.indexOf("(")
  if (index === -1) throw new Error("Not a jsonp string.")
  const cb = callback ? callback : jsonp.substring(0, index)
  const fn = new Function(`function ${cb}(j){ return j }; return ${jsonp}`)
  return fn()
}
