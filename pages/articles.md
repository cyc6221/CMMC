---
layout: page
title: Articles
permalink: /articles/
toc: false
---

{% assign items = site.articles | sort: "date" | reverse %}

<ul>
  {% for a in items %}
    <li>
      <a href="{{ a.url | relative_url }}">{{ a.title }}</a>
      {% if a.date %}<small> — {{ a.date | date: "%Y-%m-%d" }}</small>{% endif %}
    </li>
  {% endfor %}
</ul>
