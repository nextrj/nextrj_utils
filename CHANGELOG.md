# NextRJ Utilities Changelog

## 2023-03-21 0.9.0

- Add config property `toIsNotTemplate` to `FetcherInit`.

## 2023-03-20 0.8.0

- Fixed `file.ts/getLastPathName(url)` error again.

## 2023-03-20 0.7.0

- Fixed `file.ts/getLastPathName(url)` auto encode url error.

## 2023-03-19 0.6.4

- Change `npm:content-disposition` to `https://cdn.skypack.dev/content-disposition`
  > Because `deno compile` not support npm specifiers yet.

## 2023-03-16 0.6.3

- Consumed fetch response body when not ok.

## 2023-03-16 0.6.2

- Fixed truncateFilename always has `...`

## 2023-03-16 0.6.1

- Enhance FetcherInit.on.start to has fileName and filePath params.

## 2023-03-16 0.6.0

- Upgrade to `deno/std@0.180.0`.

## 2023-03-16 0.5.0

- Enhance getLastPathName.
- Add getFileNameFromContentDisposition method.
- Add getFileName method.
- Make `Fetcher.fetch` return file path and `options.to` support template.

## 2023-03-05 0.4.0

- Add file fetcher with progress callback (start, received, end).

## 2023-02-26 0.3.1

- Polishing document.

## 2023-02-26 0.3.0

- Add method `string.ts/truncateFileName` for shorten a filename with its extension
  ```ts
  truncateFilename("123456789.zip", 10) // "12...9.zip"
  // 🦄 is 2 column width
  truncateFilename("1234567🦄.zip", 10) // "1...🦄.zip"
  ```

## 2023-02-25 0.2.1

- Fixed `string.ts` document error.

## 2023-02-25 0.2.0

- Rename function `codePointLength` to `wordCount`.
- Add method `string.ts/columnCount` for get the visable width of a string.
- Refactor method `string.ts/truncate` to default truncate by max-column-count.

## 2023-02-22 0.1.0

- Format seconds to duration (`duration.ts`).
  - assertStrictEquals(format(2 * 60 + 15), "02:15")
  - assertStrictEquals(format(13 * 60 * 60 + 2 * 60 + 15), "13:02:15")

## 2023-02-19 0.0.5

- Add string template format function.
  > `format("${a}/${b}", {a: 50, b: 100}) // "50/100"`
- Polishing README
- Fixed `path.ts` document error

## 2023-02-05 0.0.4

- Fixed `string.ts` document error again.

## 2023-02-05 0.0.3

- Fixed `string.ts` document error.

## 2023-02-05 0.0.2

- Add method `string.ts/truncate` for truncate string by max-byte-length or max-code-point-length.
- Add method `string.ts/codePointLength` for get the string's code-point-length.
  > This is not the same code-unit-length of `String.length` for multi-byte string.
- Add method `string.ts/byteLength` for get the string's byte-length.

## 2023-02-05 0.0.1

- Add method `path.ts/exists|existsSync` for check whether the path is exists.
