---
layout: page
title: Papers
permalink: /research/papers/
nav_parent: pages/research.md
toc: false
---

{% assign paper_count = 0 %}
{% for p in site.papers %}
  {% assign parts = p.relative_path | split: "/" %}
  {% if parts.size == 2 %}{% assign paper_count = paper_count | plus: 1 %}{% endif %}
{% endfor %}

<h2>總共有 {{ paper_count }} 篇 papers</h2>

{% include articles/controls.html %}
{% include articles/list.html collection="papers" top_only=true %}
