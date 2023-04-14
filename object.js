// ref from https://github.com/gmasmejean/recursiveAssign

function assign(source, key, value) {
  if (isPlainObject(value)) {
    if (!isPlainObject(source[key])) {
      source[key] = {}
    }
    mergeInObject(source[key], value)
  } else {
    source[key] = value
  }
}

function mergeInObject(target, source) {
  Object.keys(source).forEach((key) => {
    assign(target, key, source[key])
  })
}

function isPlainObject(o) {
  return o !== undefined && o.constructor !== undefined && o.constructor.prototype === Object.prototype
}

/** Recursive assign {@link sources} to {@link target} and return the {@link target}. */
export function recursiveAssign(target, ...sources) {
  if (typeof target === "object") {
    sources.forEach((source) => {
      if (isPlainObject(source)) {
        mergeInObject(target, source)
      }
    })
  }
  return target
}
