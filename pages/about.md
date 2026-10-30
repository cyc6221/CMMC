---
layout: page
title: About
permalink: /about/
toc: false
---

I am CY.

<nav class="about-links" aria-label="About page sections">
    <a class="about-links__item" href="#practice">Practice</a>
    <a class="about-links__item" href="#certificate">Certificate</a>
</nav>

<div class="about-links">
    <a class="about-links__item" href="{{ '/blog-list/' | relative_url }}">Blog List</a>
    <a class="about-links__item" href="{{ '/reading-list/' | relative_url }}">Reading List</a>
    <a class="about-links__item" href="{{ '/site-list/' | relative_url }}">Site List</a>
</div>

## Practice {#practice}

<section class="now-grid">
{% include about/PortSwigger.html %}
{% include about/CryptoHack.html %}
</section>

## Certificate {#certificate}

<div class="about-links">
    <a class="about-links__item" href="{{ '/certificate-list/' | relative_url }}">Certificate List</a>
    <a class="about-links__item" href="{{ '/my-certificates/' | relative_url }}">My Certificates</a>
</div>
