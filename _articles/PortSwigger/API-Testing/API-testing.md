---
layout: page
title: API Testing
date: 2026-02-05
last_updated: 2026-02-05
label: "PortSwigger"
tags: [PortSwigger, API testing]
---

API（Application Programming Interface）是讓不同系統與應用程式能互相溝通、交換資料的介面。現代網站幾乎所有動態功能都建立在 API 之上，因此 **API 的安全性會直接影響整個網站的核心安全目標**：

* **Confidentiality（機密性）**：避免敏感資料外洩
* **Integrity（完整性）**：避免資料被未授權竄改
* **Availability（可用性）**：避免服務被打掛或無法使用

由於網站大量依賴 API，**API testing 與傳統 Web 測試高度重疊**。像 **SQL injection** 這類經典漏洞，很多時候本質上就是在攻擊後端 API 的輸入處理與資料存取邏輯。換句話說：在「一般網站」測到的漏洞，常常其實是在打它背後的 API。

<!-- --- -->

## API Recon

開始測 API 前，先把 **attack surface** 盡量摸清楚。

### 要先找到什麼？

* **API endpoints**（端點 / 路徑）
* **Input data**（必填/選填參數：path/query/header/body）
* **Supported HTTP methods**（GET/POST/PUT/PATCH/DELETE/OPTIONS…）
* **Supported content types**（JSON/XML/form…）
* **Rate limiting**（速率限制）
* **Authentication**（驗證方式：cookie/JWT/API key/OAuth…）

<!-- --- -->

## API Documentation

API 通常有文件，讓開發者知道怎麼使用與整合。

* **Human-readable**：給人看的說明、範例、使用情境
* **Machine-readable**：給工具解析的結構化文件（JSON / YAML），常見如 **OpenAPI/Swagger**

如果文件是公開的（或能被找到），**recon 第一件事先讀文件**。

### Discovering API Documentation

就算文件沒公開，也常能從應用程式本身找到線索（例如前端資源、Network 請求、或常見路由）。

#### 常見文件入口路徑

* `/api`
* `/swagger/index.html`
* `/openapi.json`

#### 看到疑似文件路徑時，往上追 base path

如果看到 `/api/swagger/v1/users/123` ，可以往上嘗試：

* `/api/swagger/v1`
* `/api/swagger`
* `/api`

### Using Machine-readable Documentation

拿到 OpenAPI（JSON/YAML）就等於拿到 API 地圖。

* 可以從 spec 快速盤點 endpoints / params / schema
* 也可以把規格匯入工具，自動生成請求並直接測試端點

<div class="remark">
  <strong>BApp</strong>
  <ol>
    <li>
      <a href="https://portswigger.net/bappstore/6bf7574b632847faaaa4eb5e42f1757c">
        OpenAPI Parser
      </a>
    </li>
  </ol>

  <strong>Tools</strong>
  <ol>
    <li>
      <a href="https://www.postman.com/">Postman</a>
    </li>
    <li>
      <a href="https://www.soapui.org/">SoapUI</a>
    </li>
  </ol>
</div>

<!-- --- -->

## Identifying API Endpoints

文件可能不準、過期或不完整；就算拿到 API documentation，也不要只靠文件，還是要實際瀏覽應用程式來驗證與補齊端點資訊。

### 用 Burp 先跑一輪

- 用 **Burp 的 browser** 把主要功能流程操作一輪，讓流量進 **HTTP history**
- 到 **Target → Site map** 整理已觀察到的路徑/端點（attack surface）
  - **Community**：以手動瀏覽 + Site map/History 為主
  - **Professional**：可額外用 **Scanner/Crawler** 先 crawl 一輪，再回到 Burp browser 手動挑重點深挖
- 留意 URL 結構中的 API pattern（例如：`/api/`）

### 從 JavaScript 挖端點

特別注意 **JavaScript 檔**，常包含「沒有透過瀏覽器操作觸發」的 API 端點或路徑參考。

- crawl/scan 過程可能會自動抽到部分端點
- 也可以在 Burp 裡手動 review `.js` 回應內容（搜尋字串通常很有效）

在 Burp 找到 `.js` 回應後，可優先搜尋：

- `/api/`
- `graphql`
- `swagger`
- `openapi`
- `fetch(` / `axios` / `XMLHttpRequest`

<div class="remark">
  <strong>BApp</strong>
  <ol>
    <li>
      <a href="https://portswigger.net/bappstore/0e61c786db0c4ac787a08c4516d52ccf">
        JS Link Finder
      </a>
    </li>
  </ol>
</div>

### Interacting with API Endpoints

一旦找出 API 端點，就可以使用 **Burp Repeater** 與 **Burp Intruder** 進行互動測試，觀察 API 的行為並挖掘更多攻擊面。

互動測試時可特別留意：

* 變更 **HTTP method**
* 變更 **Content-Type / media type**
* 仔細閱讀 **錯誤訊息與回應內容**（常會洩漏構造「有效請求」所需資訊，例如必填欄位、資料型態、正確的 JSON 結構等）

工具用途：

* **Repeater**：手動調整單一因素、比對回應差異（最常用）
* **Intruder**：批量測試／枚舉（例如路徑、參數、ID 等）

#### Identifying Supported HTTP Methods

HTTP method 代表對資源要執行的動作，例如：

* `GET`：從資源取得資料
* `PATCH`：對資源進行**部分**更新
* `OPTIONS`：取得該資源支援哪些 request methods 等資訊

同一個 endpoint 可能支援多種方法；因此在測試 API 端點時，建議把可能的 methods 都試過一輪，常能發現額外的端點功能，也等於擴大可檢視的攻擊面。

<div class="example">
  <p>例如，端點 <code>/api/tasks</code> 可能支援：</p>
  <ul>
    <li><code>GET /api/tasks</code>：取得 task 清單</li>
    <li><code>POST /api/tasks</code>：建立新 task</li>
    <li><code>DELETE /api/tasks/1</code>：刪除 task</li>
  </ul>
</div>

另外，也可以使用 Burp Intruder 內建的 **HTTP verbs list**，自動輪流測試一組常見 methods。

**Note**：測試不同 HTTP methods 時，優先針對「低優先、低風險」的資料/物件下手，以避免誤改關鍵資料或產生大量不必要的紀錄。

#### Identifying Supported Content Types

API 端點通常只接受特定資料格式，因此不同的 `Content-Type` 可能會走到不同的解析流程或防護邏輯。切換 `Content-Type` 時，可以觀察是否會：

* 觸發錯誤訊息，進而洩漏有用資訊
* 繞過設計不良或有缺陷的防禦
* 暴露處理差異（例如處理 JSON 時較安全，但處理 XML 時可能更容易受到注入攻擊）

實作時同時調整 **header** 與 **body**：先修改請求的 `Content-Type` header，再同步將 request body 改為符合該 `Content-Type` 的格式（不要只改 header，內容也要一致）。

<div class="remark">
  <strong>BApp</strong>
  <ol>
    <li>
      <a href="https://portswigger.net/bappstore/db57ecbe2cb7446292a94aa6181c9278">
        Content Type Converter
      </a>
    </li>
  </ol>
</div>

#### Using Intruder to Find Hidden Endpoints

先找到一個端點樣板，再枚舉同結構的其他功能。

例：已知

* `PUT /api/user/update`

把 `/update` 當 payload 位置，用常見字典替換：

* `add`, `create`, `delete`, `remove`, `edit`, `list`, `search`, `detail`, `export`, `import`, `status`, `config`

用 status code / response length / error message 差異判斷命中。

<!-- --- -->

## Finding Hidden Parameters

API 可能支援「文件沒寫」的參數，用來改變行為。

### 常見方法

* **Intruder**：用參數名 wordlist 去「新增參數」或「替換參數」
* **Param Miner BApp**：自動猜參數名（依 scope 與已知資訊推測）
* **Content discovery**：發現未連結內容（也可能包含參數/路徑）

---

## Mass Assignment Vulnerabilities

**Mass assignment（auto-binding）**：框架把 request 的欄位自動綁到內部 object fields。

如果後端沒做欄位白名單，可能能修改原本不該改的欄位，例如：

* `isAdmin`, `role`, `status`, `price`, `credit`, `discount`

---

## Identifying Hidden Parameters (via API Objects)

因 mass assignment 來自 object fields，可以從 API 回傳的 JSON 推測可用欄位。

例：

* `PATCH /api/users/` 只更新 `username/email`
* 但 `GET /api/users/123` 回傳還有 `id`, `isAdmin`

→ 可能代表 `id`, `isAdmin` 也是同一個 internal user object 的欄位，值得嘗試塞進 PATCH。

---

## Testing Mass Assignment Vulnerabilities

目標：測 `isAdmin` 是否可被使用者更新。

1. 先用合法值加入 PATCH：

  ```json
  {
    "username": "wiener",
    "email": "wiener@example.com",
    "isAdmin": false
  }
  ```

2. 再送不合法值觀察差異（確認後端真的在處理這個欄位）：

```json
{
  "username": "wiener",
  "email": "wiener@example.com",
  "isAdmin": "foo"
}
```

3. 若行為有差異，再嘗試利用：

```json
{
  "username": "wiener",
  "email": "wiener@example.com",
  "isAdmin": true
}
```

4. 最後用實際行為驗證（用 wiener 瀏覽網站，看是否能進 admin 功能）。

---

## Preventing Vulnerabilities in APIs

API 設計時就要把安全放在一開始。

* 文件不打算公開就要保護好（避免 docs 入口任意存取）
* 文件要保持最新，讓合法測試者掌握完整攻擊面
* 對每個 endpoint 套用 **HTTP methods allowlist**
* 驗證 request/response 的 **Content-Type** 是否符合預期
* 使用通用錯誤訊息，避免洩漏內部資訊
* 所有 API 版本都要同等防護（舊版常被遺漏）

### 防 mass assignment

* 對「可被更新的欄位」使用 **allowlist（白名單）**
* 對敏感欄位使用 **blocklist（黑名單）**（例如 `isAdmin`, `role`）

<!-- --- -->

## Learn More

* [OWASP API Security Top 10 2023](https://portswigger.net/web-security/api-testing/top-10-api-vulnerabilities)
  * > To illustrate the overlap between API testing and general web testing, we've created a mapping between our existing topics and the **OWASP API Security Top 10 2023**.
* [GraphQL API vulnerabilities](https://portswigger.net/web-security/graphql)
  * > To learn more GraphQL APIs, see our **GraphQL API vulnerabilities** Academy topic.

## References

* [API testing (Learning path)](https://portswigger.net/web-security/learning-paths/api-testing)
* [API testing](https://portswigger.net/web-security/api-testing)

<div class="definition">
  <strong>Learning Paths</strong>
  <ol>
    <li>API recon</li>
    <li>API documentation</li>
    <li>Identifying and interacting with API endpoints</li>
    <li>Finding hidden parameters</li>
    <li>Mass assignment vulnerabilities</li>
    <li>Preventing vulnerabilities in APIs</li>
    <li>Server-side parameter pollution</li>
    <li>Testing for server-side parameter pollution in the query string</li>
    <li>Testing for server-side parameter pollution in REST paths</li>
    <li>Testing for server-side parameter pollution in structured data formats</li>
    <li>Testing for server-side parameter pollution with automated tools</li>
    <li>Preventing server-side parameter pollution</li>
  </ol>
</div>
