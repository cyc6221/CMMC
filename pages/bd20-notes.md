---
layout: page
title: BD20 Notes
permalink: /research/papers/BD20-notes/
toc: false
---

[← Papers]({{ "/research/papers/" | relative_url }}) · [BD20 論文頁]({{ "/research/papers/BD20/" | relative_url }})

{% assign note_count = 0 %}
{% for p in site.papers %}
  {% assign parts = p.relative_path | split: "/" %}
  {% if parts[1] == "BD20" %}{% assign note_count = note_count | plus: 1 %}{% endif %}
{% endfor %}

<h2>總共有 {{ note_count }} 篇 BD20 notes</h2>

{% include articles/controls.html %}
{% include articles/list.html collection="papers" dir="BD20" %}
