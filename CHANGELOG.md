# NextRJ Utilities Changelog

## 2023-02-05 0.0.3

- Fixed `string.ts` document error.

## 2023-02-05 0.0.2

- Add method `string.ts/truncate` for truncate string by max-byte-length or max-code-point-length.
- Add method `string.ts/codePointLength` for get the string's code-point-length.
  > This is not the same code-unit-length of `String.length` for multi-byte string.
- Add method `string.ts/byteLength` for get the string's byte-length.

## 2023-02-05 0.0.1

- Add method `path.ts/exists|existsSync` for check whether the path is exists.
