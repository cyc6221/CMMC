---
layout: page
title: Find the Flag in a PDF
date: 2026-01-26
last_updated: 2026-01-26
tags: [CTF]
---

## Find `flag` from extracted text

把 PDF 內可抽出的文字轉成 stdout，再用 `grep` 不分大小寫找 `flag`。

```bash
pdftotext target.pdf - | grep -iE "flag"
```

## Check metadata

有些題目會把 flag 藏在 PDF 的中繼資料（例如作者、標題、註解、自訂欄位）。

* `exiftool`：看更完整的 metadata

```bash
exiftool target.pdf
```

* `pdfinfo`：看頁數、加密狀態、建立工具、版本等基本資訊

```bash
pdfinfo target.pdf
```

## Scan embedded strings

直接從二進位檔中抽出「看起來像字串」的片段，再用 `grep` 找 `flag`。
`-n 6` 表示至少 6 個字元以上才輸出，減少雜訊。

```bash
strings -n 6 target.pdf | grep -iE "flag"
```

## Grep directly on the PDF

把 PDF 當作二進位檔處理直接找 `flag`。

* `-a`：把二進位檔當文字處理
* `-o`：只輸出匹配到的片段
* `-i`：不分大小寫

```bash
grep -aoiE "flag" target.pdf
```
