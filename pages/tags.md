---
layout: page
title: Tags
permalink: /tags/
toc: false
---

{% assign docs = site.articles %}
{% assign tagged = docs | where_exp: "d", "d.tags" %}

{%- comment -%} 收集所有 tags（只來自 articles） {%- endcomment -%}
{% assign all_tags = "" | split: "" %}
{% for d in tagged %}
  {% for t in d.tags %}
    {% assign all_tags = all_tags | push: t %}
  {% endfor %}
{% endfor %}
{% assign all_tags = all_tags | uniq | sort %}

<ul>
{% for t in all_tags %}
  {% assign tid = t | slugify %}
  <li><a href="#{{ tid }}">{{ t }}</a></li>
{% endfor %}
</ul>

<hr>

{% for t in all_tags %}
  {% assign tid = t | slugify %}
  <h2 id="{{ tid }}">{{ t }}</h2>

  <ul>
  {% for d in tagged %}
    {% if d.tags contains t %}
      <li>
        <a href="{{ d.url | relative_url }}">{{ d.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
