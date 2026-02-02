---
layout: page
title: Web Cache Deception
date: 2026-02-02
last_updated: 2026-02-02
tags: [PortSwigger, WCD, Caching, CDN, Web Security]
---

參考 PortSwigger 的 [Web Cache Deception](https://portswigger.net/web-security/learning-paths/web-cache-deception) Learning Paths 整理。

<div class="remark">

<strong> Learning Paths </strong>

1. Web caches
2. Constructing a web cache deception attack
3. Exploiting static extension cache rules
4. Using path mapping discrepancies
5. Using delimiter discrepancies
6. Using delimiter decoding discrepancies
7. Exploiting static directory cache rules
8. Using normalization discrepancies
9. Exploiting file name cache rules
10. Preventing vulnerabilities

</div>

---

## Overview

Web Cache Deception (WCD) 是指快取欺騙——讓「動態/敏感內容」被快取層誤認為靜態資源而被**共享快取**，導致資料外洩。

### 快取的基本概念

- Web cache（常見於 **CDN**、反向代理、邊緣節點）位於使用者與 origin server 之間：
  - **Cache hit**：快取已有副本 → 直接回覆（快）
  - **Cache miss**：快取沒有 → 轉發到 origin → 拿到回應後再決定是否存入快取
- CDN（Content Delivery Network）是一群分散的邊緣伺服器，把靜態內容快取到離使用者更近的地方，降低延遲、減輕 origin 負載。  
- **風險點**：若 CDN/快取規則錯誤，把「本該不共享快取」的動態內容也存起來，就可能造成 WCD。

### Cache keys

快取收到 HTTP request 時，會用 request 的某些元素組出 **cache key**，例如：

- URL path
- Query string
- 可能還包含某些 headers（例如 `Accept-Encoding`, `Host`, `X-Forwarded-Host`, `Cookie`）
- 有時包含 content type / method

**同一 cache key → 視為「同一資源」→ 會回同一份快取回應。**

### Cache rules

快取規則決定：**哪些回應能被快取、快多久**。常見規則類型：

1. Static file extension rules
   - `.css`
   - `.js`

2. Static directory prefix rules
   - `/static`
   - `/assets`
   - `/scripts`
   - `/images`

3. File name rules
   - `robots.txt`
   - `index.html`
   - `favicon.ico`

---

## Constructing a web cache deception attack

<div class="remark">
  <strong>Attack flow</strong>

  <ol>
    <li>
      鎖定一個<strong>動態且含敏感資料</strong>的端點（如 <code>/my-account</code>、訂單頁、API key 頁），確認「不同登入者」回應內容確實不同。
    </li>
    <li>
      找出一種可造成<strong>cache 與 origin 解析不一致</strong>的 URL 變形方式，目標是讓：
      <ul>
        <li><strong>Origin</strong>：仍路由到同一個動態端點並回傳個人化內容</li>
        <li><strong>Cache</strong>：把它當成可快取資源（常見：看起來像靜態副檔名、或含特殊分隔符）</li>
      </ul>
      例：<code>/my-account/anything.css</code>、<code>/my-account;anything.css</code>、<code>/my-account%23anything.css</code>（依實際站點規則調整）。
    </li>
    <li>
      用 Burp 反覆請求該變形 URL，觀察是否出現快取跡象（如 <code>X-Cache: hit</code>、<code>Age</code> 增加、回應時間明顯變快），以確認「此 URL 會被快取」。
    </li>
    <li>
      觸發<strong>受害者在登入狀態</strong>下請求該 URL，使其個人化回應被 cache 以該 URL 的 cache key 寫入共享快取（即完成 cache poisoning/priming）。
    </li>
    <li>
      攻擊者再以<strong>完全相同的 URL</strong>（同一路徑、同樣的變形字串）請求一次，若 cache 命中則直接回傳先前被存下的受害者回應，進而取得敏感資料。
    </li>
  </ol>

  <blockquote>
    判斷成功的關鍵：相同 URL 對不同使用者本應回不同內容，但實際上攻擊者拿到的是受害者的回應副本（且有 cache hit/age 等證據佐證）。
  </blockquote>
</div>

### Using a cache buster

- **Why**：測不同 payload 時若 cache key 沒變，可能一直拿到舊快取 → 誤判。
- **How**：URL 加每次不同的 query（例：`?cb=RANDOM`）。
- **Pitfall（Param Miner: Add dynamic cachebuster）**：在要觀察 **hit** 的階段若每次自動改 URL → cache key 每次都變 → 永遠像 **miss**。
- **Rule**：
  - 探測/枚舉：✅ 可用 buster（避免舊快取干擾）
  - 驗證是否能 hit：❌ 關掉自動 buster，固定同一 URL 重送

### Detecting cached responses

- **Look at response headers**
  - `X-Cache`（或類似 header，例如 `CF-Cache-Status`、`X-Cache-Hits`、`X-Served-By` 等）：用來判斷是否命中快取  
    - 常見為 `HIT` / `MISS` / `EXPIRED`（實際值依 CDN/反向代理而異）
    - `MISS`：通常代表快取沒有該 key → 去 origin 取回；可再送一次觀察是否變成 `HIT`
  - `Cache-Control`：例如 `public` + `max-age>0` 只代表「可快取」的提示；實際是否快取仍可能被 CDN/代理規則覆蓋，不能單靠它判斷
  - `Age`：表示資源在（某一層）快取中存放多久（秒）  
    - `Age: 0`：通常表示剛取回/剛寫入快取（不一定等同於 miss）  
    - `Age` 隨時間遞增：通常代表快取內容仍存在且被重複使用（hit 的強訊號之一）
  - `Vary`：表示快取會依哪些 request header 分割內容（影響 cache key 的變體）
    - `Vary: Accept-Encoding`：依 `Accept-Encoding` 不同存不同版本
    - `Vary: Cookie`：可能依 Cookie 分割（較少見；也常導致不共享或不快取）
    - `Vary: Authorization`：可能依授權資訊分割（較少見；不少系統會直接避免共享快取）
  - 其他跡象：若回應包含 `Set-Cookie`，許多共享快取/代理可能會避免儲存或避免共享該回應（需視實作而定）

- **Look at response time**
  - 同一 request 明顯變快，可能是 hit（仍建議搭配 headers 一起確認）

---

## Exploiting static extension cache rules

把一個會回動態內容的 endpoint，構造成**看起來像 `.js/.css`** 的 URL，使 cache 依副檔名規則快取，但 origin 仍回動態內容。

此類 WCD 常依賴 **path mapping discrepancy** 或 **delimiter discrepancy** 等差異。

### Path mapping discrepancies

- **Traditional mapping**：URL 像檔案路徑（例：`/dir/file.html`）
- **REST-style mapping**：URL 像 endpoint + path params（例：`/resource/123/detail`）

- **典型落差**
  - 例：`/user/123/profile/wcd.css`
  - Origin（REST）可能只路由到 `/user/123/profile`，忽略尾端 `wcd.css`
  - Cache（傳統）可能把整段當「檔案路徑」，看到 `.css` 就當可快取資源 → 可能觸發快取

- **實務測法（概念）**
  1. 在動態 endpoint 後加任意段：`/api/orders/123/foo`  
     → 看 origin 是否仍回同內容（表示路由容錯/抽象）
  2. 再加副檔名：`/api/orders/123/foo.js`  
     → 看 cache 指標是否出現（`X-Cache` / `Age` 是否 hit、遞增）

### Delimiter discrepancies

- **Delimiter 是什麼？**（URL 中有「分隔/解析意義」的字元）
  - `?`：分隔 query string
  - `;`：有些框架用於 matrix variables
  - `#`：fragment（通常不會送到 server）
  - `.`：部分框架用於格式/副檔名選擇（例：Rails）

- **核心概念：origin 截斷、cache 不截斷（或反之）**
  - 例（概念）：`...;aaa.js`
    - Cache：把 `;aaa.js` 當 path 一部分，看到 `.js` → 依靜態資源規則快取
    - Origin：把 `;` 當 delimiter → 截斷回動態 endpoint → 回敏感內容

- **注意事項**
  - 有些字元會在瀏覽器端被截斷/不送出（例如 `#` 後面）
  - 需要時可用 **URL-encoded** 版本做測試（下一節再接）

### Delimiter decoding discrepancies

- **核心概念**：Cache 與 origin 對 `%xx` 的解碼順序/行為不一致
  - Origin 先 decode → 把解碼後字元當 delimiter → 截斷/改路由
  - Cache 不 decode（或反過來）→ 仍把整段當 path → 可能吃到副檔名/路徑規則而快取

- **常見 `%xx`**
  - `%23` → `#`
  - `%3f` → `?`

- **例（概念）**：`/profile%23wcd.css`
  - Origin decode → 變成 `/profile#wcd.css` → 可能只處理 `/profile`
  - Cache 不 decode → 視為 `/profile%23wcd.css`，結尾 `.css` → 可能被快取

---

## Exploiting static directory cache rules

把 URL 開頭做成 `/assets/...` / `/static/...`，以命中「前綴快取規則」。  
但 origin 透過解析/正規化後，實際回到動態端點內容。

> 此類常與 path traversal / normalization discrepancy 結合。

### Normalization discrepancies（正規化差異）

- **Normalization 是什麼？**把 URL path 轉成標準形式，可能包含：
  - decode：`%2f` → `/`
  - dot-segments 正規化：處理 `../`、`./`

- **例（概念）**：`/static/..%2fprofile`
  - Origin：decode + resolve → `/profile`（走動態 profile）
  - Cache：不 decode / 不 resolve → 仍視為 `/static/..%2fprofile`（字面上以 `/static` 開頭 → 可能套用快取規則）

### Detecting normalization by the origin server

- **Why often use POST?**  
  目標是觀察 **origin 對路徑的 decode / normalize / routing 行為**，而不是測快取是否命中。  
  因此常用 `POST`（或在 request 加上 `Cache-Control: no-store`）來降低「被快取結果干擾判讀」的機率。

- **概念測法**
  - 選定目標端點（例：`/profile`），再構造一個「看起來不同、但可能被 origin 正規化回同一路由」的變形路徑  
    例：`/aaa/..%2fprofile`（或其他 dot-segment / encoding 變形）
  - 對比兩者回應：
    - 若變形路徑回應內容/狀態碼與 `/profile` 一致 → origin 可能做了 decode + dot-segment resolve（或等效的路由正規化）
    - 若回 `404`、redirect 到不同位置、或內容明顯不同 → origin 可能沒有做該正規化（或行為不同）

- **小提醒**
  - 瀏覽器/部分 client 可能會先在本地處理 `../`，導致請求送不到想測的原始字串；因此 dot-segment 相關片段通常需要用 **URL-encoding**（如 `%2f`）包起來再測

### Detecting normalization by the cache server

- **前置**：先找一個「確定會被快取」的靜態資源（例：`/assets/js/app.js`），再改 URL 觀察 `X-Cache/Age` 是否仍 hit。

- **在前面加任意段**
  - 測：`/aaa/..%2fassets/js/app.js`
  - 不再快取 → cache 可能不 normalize（沒還原回 `/assets/...`）
  - 仍快取 → cache 可能 normalize 回 `/assets/...`

- **在目錄前綴後面插 traversal**
  - 測：`/assets/..%2fjs/app.js`
  - 不再快取 → cache decode+resolve 後變 `/js/...`，不再以 `/assets` 開頭 → 不命中前綴規則
  - 仍快取 → cache 可能沒 decode/resolve（或順序不同），仍以 `/assets` 開頭 → 命中

- **避免誤判：確認是否真的是「前綴規則」**
  - 因為命中可能其實是「副檔名規則」在快取（例如 `.js`）
  - 可測：`GET /assets/aaa`（任意字串）
    - 若仍快取 → 比較能支持存在 `/assets` 前綴規則
    - 若 404 且不快取 → 不一定能否定（很多 cache 不快取 404）

---

### Exploiting normalization discrepancies

- **Case A：origin normalize、cache 不 normalize**
  - 前提：origin 會 resolve encoded dot-segments；cache 只看字面 path 套規則
  - Payload 結構：`/<static-prefix>/..%2f<dynamic-path>`
  - 例：`/assets/..%2fprofile`
    - Cache：視為 `/assets/..%2fprofile` → 命中 `/assets` 前綴規則 → 可能快取
    - Origin：normalize → `/profile` → 回動態內容

- **Case B：cache normalize、origin 不 normalize**
  - 單靠 traversal 常不夠（origin 可能直接回錯誤）
  - 通常要搭配 **delimiter discrepancy**
    - Origin：遇 delimiter 截斷 → 回到動態 endpoint
    - Cache：不截斷（或行為不同）→ 仍 normalize 後半段、命中靜態規則 → 快取
  - 概念 payload：`/profile;<encoded-traversal-to-static>`
    - Cache：不做 delimiter 截斷，normalize → `/static/...` → 快取
    - Origin：在 delimiter 截斷 → `/profile` → 回動態內容
  - 注意：某些字元（如 `#`）瀏覽器端不會送出；必要時用 encoded 版本或選可到達 cache/origin 的 delimiter

---

## File name cache rules（檔名規則）

- **概念**：cache 可能對特定檔名做精準快取規則（例：`index.html`、`robots.txt`、`favicon.ico`）
- **怎麼測**：`GET /index.html`、`GET /robots.txt`… 觀察 `X-Cache` / `Age` 是否命中
- **搭配 normalization discrepancy（概念測法）**
  - 用全編碼 traversal 讓 cache 可能 normalize 成 `/index.html`
  - 例：`/profile%2f%2e%2e%2findex.html`
    - 若被快取 → cache 可能 normalize → 命中檔名規則
    - 若不快取 → cache 可能不 decode/resolve（或順序不同）
- **可利用型態**：多半較容易利用「cache 會 normalize、origin 不會」（檔名規則需要精準匹配）

---

## Preventing web cache deception vulnerabilities

- **對動態/敏感內容明確禁止快取**
  - `Cache-Control: no-store, private`

- **CDN 不要覆蓋/忽略 origin 的快取策略**
  - 確保 CDN respect `Cache-Control`

- **開啟/使用 CDN 的 WCD 防護**
  - 檢查 `Content-Type` 是否與 URL 檔案型態一致  
    - 例：`.css` 不應回 `text/html`

- **消除 cache 與 origin 的 URL 解析差異**
  - 統一 decode / normalize 行為（dot-segment、encoded `/` 等）
  - 避免容錯路由讓多種 path 取到同一敏感內容
  - 限制或一致化 delimiter（如 `;`, `.` 等）處理
