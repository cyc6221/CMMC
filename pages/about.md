---
layout: page
title: About
permalink: /about/
toc: false
---

## Me

I am CY.

<!-- --- -->

## Currently

<section class="now-grid">

<!-- Cryptography: An Introduction (Third Edition) -->

<article class="now-card">
    <header class="now-head">
        <span class="now-icon" aria-hidden="true">📚</span>
        <div class="now-title">
            <h3>Studying</h3>
            <span class="now-badge">Chapter 17</span>
        </div>
    </header>
    <div class="now-body">
        <p class="now-primary">
            Nigel Smart.
            <a class="now-link" href="https://nigelsmart.github.io/Crypto_Book/book.pdf" target="_blank" rel="noopener">
                Cryptography: An Introduction (Third Edition)
            </a>
        </p>
        <ul class="now-list">
            <li><strong>Now</strong>: Attacks on Public Key Schemes</li>
            <li>Notes: lattice / LLL / Coppersmith (整理中)</li>
        </ul>
        <div class="chap-strip" aria-label="Chapters 1 to 26">
            <span class="chap">1</span>
            <span class="chap">2</span>
            <span class="chap">3</span>
            <span class="chap">4</span>
            <span class="chap">5</span>
            <span class="chap">6</span>
            <span class="chap">7</span>
            <span class="chap">8</span>
            <span class="chap">9</span>
            <span class="chap">10</span>
            <span class="chap">11</span>
            <span class="chap">12</span>
            <span class="chap">13</span>
            <span class="chap">14</span>
            <span class="chap">15</span>
            <span class="chap">16</span>
            <span class="chap reading">17</span>
            <span class="chap">18</span>
            <span class="chap">19</span>
            <span class="chap">20</span>
            <span class="chap">21</span>
            <span class="chap">22</span>
            <span class="chap">23</span>
            <span class="chap">24</span>
            <span class="chap">25</span>
            <span class="chap">26</span>
        </div>
        <p class="chap-hint">
            <span class="chap-dot chap-dot--done"></span> done
            <span class="chap-dot chap-dot--reading"></span> reading
            <span class="chap-dot chap-dot--todo"></span> todo
        </p>
        {% assign done = 1 %}
        {% assign total = 26 %}
        {% assign pct = done | times: 100 | divided_by: total %}
        <div class="now-progress" role="group" aria-label="Reading progress">
            <div class="now-progress__label">
                <span class="now-progress__text">Progress</span>
                <span class="now-progress__pct">{{ done }}/{{ total }} ({{ pct }}%)</span>
            </div>
            <div class="now-progress__track" aria-hidden="true">
                <span class="now-progress__bar" style="width: {{ pct }}%;"></span>
            </div>
        </div>
    </div>
</article>

<!-- PortSwigger -->

<article class="now-card">
    <header class="now-head">
        <span class="now-icon" aria-hidden="true">🧪</span>
        <div class="now-title">
            <h3>PortSwigger</h3>
            <span class="now-badge now-badge--alt2">
                Web Cache Deception
            </span>
        </div>
    </header>
    <div class="now-body">
        <p class="now-primary">
            <a class="now-link" href="https://portswigger.net/" target="_blank" rel="noopener">
                PortSwigger
            </a>
            <a class="now-link" href="https://portswigger.net/web-security/learning-paths" target="_blank" rel="noopener">
                Web Security Academy Learning Paths
            </a>
        </p>
        <ul class="now-list">
            <li><strong>Now</strong>: Web Cache Deception</li>
        </ul>
        <div class="chap-strip" aria-label="All learning paths">
            <span class="chap-pill">API testing</span>
            <span class="chap-pill">Server-Side vulnerabilities</span>
            <span class="chap-pill">SQL injection</span>
            <span class="chap-pill reading">Web cache deception</span>
            <span class="chap-pill">WebSockets vulnerabilities</span>
            <span class="chap-pill">Authentication vulnerabilities</span>
            <span class="chap-pill">Server-side request forgery (SSRF) attacks</span>
            <span class="chap-pill">Prototype pollution</span>
            <span class="chap-pill">Clickjacking (UI redressing)</span>
            <span class="chap-pill">GraphQL API vulnerabilities</span>
            <span class="chap-pill">Cross-origin resource sharing (CORS)</span>
            <span class="chap-pill">Path traversal</span>
            <span class="chap-pill">NoSQL injection</span>
            <span class="chap-pill">Race conditions</span>
            <span class="chap-pill">Cross-site request forgery (CSRF)</span>
            <span class="chap-pill">File upload vulnerabilities</span>
            <span class="chap-pill">Web LLM attacks</span>
        </div>
        <p class="chap-hint">
            <span class="chap-dot chap-dot--done"></span> done
            <span class="chap-dot chap-dot--reading"></span> reading
            <span class="chap-dot chap-dot--todo"></span> todo
        </p>
        {% assign done = 1 %}
        {% assign total = 17 %}
        {% assign pct = done | times: 100 | divided_by: total %}
        <div class="now-progress" role="group" aria-label="Reading progress">
            <div class="now-progress__label">
                <span class="now-progress__text">Progress</span>
                <span class="now-progress__pct">{{ done }}/{{ total }} ({{ pct }}%)</span>
            </div>
            <div class="now-progress__track" aria-hidden="true">
                <span class="now-progress__bar" style="width: {{ pct }}%;"></span>
            </div>
        </div>
    </div>
</article>

</section>

<!-- --- -->

## Site

This site is built with Jekyll and hosted on GitHub Pages.
