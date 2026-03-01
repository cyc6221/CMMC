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

This is my [reading list]({{ "/readinglist/" | relative_url }}).

<section class="now-grid">

<!-- Cryptography: An Introduction (Third Edition) -->

<article class="now-card">
    <header class="now-head">
        <span class="now-icon" aria-hidden="true">📜</span>
        <div class="now-title">
            <h3>Studying</h3>
            <span class="now-badge">Chapter 18</span>
        </div>
    </header>
    <!-- --- -->
    <div class="now-body">
        <p class="now-primary">
            Nigel Smart.
            <a class="now-link" href="https://nigelsmart.github.io/Crypto_Book/book.pdf" target="_blank" rel="noopener">
                Cryptography: An Introduction (Third Edition)
            </a>
        </p>
        <!-- --- -->
        <ul class="now-list">
            <li><strong>Now</strong>: Attacks on Public Key Schemes</li>
            <li><a href="{{ '/crypto-an-intro/' | relative_url }}">Cryptography: An Introduction — Contents</a></li>
        </ul>
        <!-- --- -->
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
            <span class="chap reading">18</span>
            <span class="chap">19</span>
            <span class="chap">20</span>
            <span class="chap">21</span>
            <span class="chap">22</span>
            <span class="chap">23</span>
            <span class="chap">24</span>
            <span class="chap">25</span>
            <span class="chap">26</span>
        </div>
        <!-- --- -->
        <p class="chap-hint">
            <span class="chap-dot chap-dot--done"></span> done
            <span class="chap-dot chap-dot--reading"></span> reading
            <span class="chap-dot chap-dot--todo"></span> todo
        </p>
        <!-- --- -->
        {% assign done = 2 %}
        {% assign total = 26 %}
        {% assign pct = done | times: 100 | divided_by: total %}
        <div class="now-progress" role="group" aria-label="Reading progress">
            <div class="now-progress__label">
                <span class="now-progress__text">Progress</span>
                <span class="now-progress__pct">{{ done }}/{{ total }} ({{ pct }}%)</span>
            </div>
            <!-- --- -->
            <div class="now-progress__track" aria-hidden="true">
                <span class="now-progress__bar" style="width: {{ pct }}%;"></span>
            </div>
        </div>
    </div>
</article>

<!-- PortSwigger -->

<article class="now-card">
    <header class="now-head">
        <span class="now-icon" aria-hidden="true">🕷️</span>
        <div class="now-title">
            <h3>PortSwigger</h3>
            <span class="now-badge now-badge--alt2">
                Web Cache Deception
            </span>
        </div>
    </header>
    <!-- --- -->
    <div class="now-body">
        <p class="now-primary">
            <a class="now-link" href="https://portswigger.net/" target="_blank" rel="noopener">
                PortSwigger
            </a>
            <a class="now-link" href="https://portswigger.net/web-security/learning-paths" target="_blank" rel="noopener">
                Web Security Academy Learning Paths
            </a>
        </p>
        <!-- --- -->
        <ul class="now-list">
            <li><strong>Now</strong>: Web Cache Deception</li>
            <li><a href="{{ '/PortSwigger/' | relative_url }}">PortSwigger All Learning Paths — Contents</a></li>
            <li><a href="{{ '/PortSwigger-all-labs/' | relative_url }}">PortSwigger All Labs</a></li>
        </ul>
        <!-- --- -->
        <div class="chap-strip" aria-label="All learning paths">
            <span class="chap-pill reading">API testing</span>
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
        <!-- --- -->
        <p class="chap-hint">
            <span class="chap-dot chap-dot--done"></span> done
            <span class="chap-dot chap-dot--reading"></span> reading
            <span class="chap-dot chap-dot--todo"></span> todo
        </p>
        <!-- --- -->
        {% assign done = 2 %}
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
        <!-- --- -->
        <!-- Level progress-->
        {% comment %} Level progress (manual numbers) {% endcomment %}
        {% assign ap_done = 2 %}
        {% assign ap_total = 59 %}
        {% assign pr_done = 2 %}
        {% assign pr_total = 172 %}
        {% assign ex_done = 0 %}
        {% assign ex_total = 39 %}
        <!-- percentage -->
        {% assign ap_pct = ap_done | times: 100 | divided_by: ap_total %}
        {% assign pr_pct = pr_done | times: 100 | divided_by: pr_total %}
        {% assign ex_pct = ex_done | times: 100 | divided_by: ex_total %}
        <!-- level progress div -->
        <div class="level-progress" role="group" aria-label="Level progress">
            <div class="level-progress__head">
                <span class="level-progress__title">Lab progress</span>
            </div>
            <div class="level-progress__grid">
                <!-- Apprentice -->
                <div class="level-item">
                    <div
                        class="level-ring"
                        style="--pct: {{ ap_pct }};"
                        role="img"
                        aria-label="Apprentice {{ ap_done }} of {{ ap_total }} ({{ ap_pct }}%)"
                    >
                        <div class="level-ring__inner">
                            <div class="level-ring__num">{{ ap_done }}</div>
                            <div class="level-ring__sub">of {{ ap_total }}</div>
                        </div>
                    </div>
                    <div class="level-item__label">Apprentice</div>
                </div>
                <!-- end of Apprentice -->
                <!-- --- -->
                <div class="level-divider" aria-hidden="true"></div>
                <!-- --- -->
                <!-- Practitioner -->
                <div class="level-item">
                    <div
                        class="level-ring level-ring--alt"
                        style="--pct: {{ pr_pct }};"
                        role="img"
                        aria-label="Practitioner {{ pr_done }} of {{ pr_total }} ({{ pr_pct }}%)"
                    >
                        <div class="level-ring__inner">
                            <div class="level-ring__num">{{ pr_done }}</div>
                            <div class="level-ring__sub">of {{ pr_total }}</div>
                        </div>
                    </div>
                    <div class="level-item__label">Practitioner</div>
                </div>
                <!-- end of Practitioner -->
                <!-- --- -->
                <div class="level-divider" aria-hidden="true"></div>
                <!-- --- -->
                <!-- Expert -->
                <div class="level-item">
                    <div
                        class="level-ring level-ring--alt2"
                        style="--pct: {{ ex_pct }};"
                        role="img"
                        aria-label="Expert {{ ex_done }} of {{ ex_total }} ({{ ex_pct }}%)"
                    >
                        <div class="level-ring__inner">
                            <div class="level-ring__num">{{ ex_done }}</div>
                            <div class="level-ring__sub">of {{ ex_total }}</div>
                        </div>
                    </div>
                    <div class="level-item__label">Expert</div>
                </div>
                <!-- end of Expert -->
            </div>
        <!-- end of level progress div -->
        </div>
    <!-- end of now-body -->
    </div>
</article>

<!-- CryptoHack -->

<article class="now-card">
    <header class="now-head">
        <span class="now-icon" aria-hidden="true">🕷️</span>
        <div class="now-title">
            <h3>CryptoHack</h3>
            <span class="now-badge now-badge--alt2">
                Modular Arithmetic
            </span>
        </div>
    </header>
    <!-- --- -->
    <div class="now-body">
        <p class="now-primary">
            <a class="now-link" href="https://cryptohack.org/" target="_blank" rel="noopener">
                CryptoHack
            </a>
            <a class="now-link" href="https://cryptohack.org/courses/" target="_blank" rel="noopener">
                CryptoHack Courses
            </a>
        </p>
        <!-- --- -->
        <ul class="now-list">
            <li><strong>Now</strong>: Modular Arithmetic</li>
            <li><a href="{{ '/CryptoHack-all-problems/' | relative_url }}">CryptoHack All Problems</a></li>
        </ul>
        <!-- --- -->
        <div class="chap-strip" aria-label="All learning paths">
            <span class="chap-pill done">Introduction to CryptoHack</span>
            <span class="chap-pill reading">Modular Arithmetic</span>
            <span class="chap-pill">Symmetric Cryptography</span>
            <span class="chap-pill">Public-Key Cryptography</span>
            <span class="chap-pill">Ellipic Curve</span>
        </div>
        <!-- --- -->
        <p class="chap-hint">
            <span class="chap-dot chap-dot--done"></span> done
            <span class="chap-dot chap-dot--reading"></span> reading
            <span class="chap-dot chap-dot--todo"></span> todo
        </p>
        <!-- --- -->
        {% assign done = 2 %}
        {% assign total = 5 %}
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
        <!-- --- -->
        {%- comment -%} --- Points bar (level + points) --- {%- endcomment -%}
        {% assign level = 7 %}
        {% assign points_cur = 505 %}
        {% assign points_total = 640 %}
        <!-- --- -->
        <!-- 避免除以 0；同時把 pct 限制在 0~100 -->
        {% if points_total <= 0 %}
            {% assign points_pct = 0 %}
        {% else %}
            {% assign points_pct = points_cur | times: 100 | divided_by: points_total %}
        {% endif %}
        {% if points_pct < 0 %}{% assign points_pct = 0 %}{% endif %}
        {% if points_pct > 100 %}{% assign points_pct = 100 %}{% endif %}
        <!-- --- -->
        <div class="now-xp" role="group" aria-label="Level and points">
            <div class="now-xp__meta">
                <span class="now-xp__stat" title="Level">
                    <span class="now-xp__icon" aria-hidden="true">⚡</span>
                    <span class="now-xp__num">{{ level }}</span>
                </span>
                <span class="now-xp__stat" title="Points">
                    <span class="now-xp__icon" aria-hidden="true">⭐</span>
                    <span class="now-xp__num">{{ points_cur }}</span>
                </span>
                <span class="now-xp__pct">
                    {{ points_cur }}/{{ points_total }} ({{ points_pct }}%)
                </span>
            </div>
            <div class="now-xp__track" aria-hidden="true">
                <span class="now-xp__bar" style="width: {{ points_pct }}%;"></span>
            </div>
        </div>
    <!-- end of now-body -->
    </div>
</article>

</section>

<!-- --- -->

## Site

This site is built with Jekyll and hosted on GitHub Pages.
