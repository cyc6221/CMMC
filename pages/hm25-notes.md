---
layout: page
title: HM25 Notes
permalink: /research/papers/HM25-notes/
toc: false
---

[← Papers]({{ "/research/papers/" | relative_url }}) · [HM25 論文頁]({{ "/research/papers/HM25/" | relative_url }})

{% assign note_count = 0 %}
{% for p in site.papers %}
  {% assign parts = p.relative_path | split: "/" %}
  {% if parts[1] == "HM25" %}{% assign note_count = note_count | plus: 1 %}{% endif %}
{% endfor %}

<h2>總共有 {{ note_count }} 篇 HM25 notes</h2>

{% include articles/controls.html %}
{% include articles/list.html collection="papers" dir="HM25" %}
