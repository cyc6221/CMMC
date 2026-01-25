---
layout: page
title: Tags
permalink: /tags/
toc: false
---

{% comment %} 只掃 _articles => site.articles {% endcomment %}
{% assign docs = site.articles | where_exp: "d", "d.tags" %}

{% assign all_tags = "" | split: "" %}
{% for d in docs %}
  {% for t in d.tags %}
    {% assign all_tags = all_tags | push: t %}
  {% endfor %}
{% endfor %}
{% assign all_tags = all_tags | uniq | sort %}

<div class="tags-page">
  <div class="tags-bar" id="tagsBar" aria-label="Tags">
    {% for t in all_tags %}
      {% assign tid = t | slugify %}
      <button class="tag-btn" type="button" data-tag="{{ tid }}">#{{ t }}</button>
    {% endfor %}
  </div>

  <div class="tags-hint" id="tagsHint">
    請先選擇一個 tag 才會顯示文章。
  </div>

  <ul id="articlesList" class="articles-list is-hidden">
    {% for a in site.articles %}
      {% assign atags = "" | split: "" %}
      {% if a.tags %}
        {% for t in a.tags %}
          {% assign atags = atags | push: (t | slugify) %}
        {% endfor %}
      {% endif %}

      <li
        class="articles-item"
        data-tags="{{ atags | join: ' ' }}"
        data-title="{{ a.title | escape }}"
        data-date="{% if a.date %}{{ a.date | date: '%Y-%m-%d' }}{% else %}{% endif %}"
      >
        <a class="articles-link" href="{{ a.url | relative_url }}">{{ a.title }}</a>
        {% if a.date %}<div class="articles-meta">{{ a.date | date: "%Y-%m-%d" }}</div>{% endif %}
      </li>
    {% endfor %}
  </ul>
</div>

<script>
(function () {
  const bar = document.getElementById('tagsBar');
  const hint = document.getElementById('tagsHint');
  const list = document.getElementById('articlesList');
  const items = Array.from(list.querySelectorAll('.articles-item'));
  const buttons = Array.from(bar.querySelectorAll('.tag-btn'));

  function setActive(tag) {
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tag === tag);
    });
  }

  function filter(tag) {
    if (!tag) {
      setActive(null);
      hint.style.display = '';
      list.classList.add('is-hidden');
      return;
    }

    setActive(tag);
    hint.style.display = 'none';
    list.classList.remove('is-hidden');

    let shown = 0;
    items.forEach(li => {
      const tags = (li.dataset.tags || '').split(/\s+/).filter(Boolean);
      const ok = tags.includes(tag);
      li.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });

    if (shown === 0) {
      hint.textContent = '此 tag 目前沒有文章。';
      hint.style.display = '';
      list.classList.add('is-hidden');
    }
  }

  function getHashTag() {
    const h = (location.hash || '').replace(/^#/, '').trim();
    return h || null;
  }

  // 點按鈕 -> 更新 hash（可分享連結 /tags/#cryptography）
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-btn');
    if (!btn) return;
    const tag = btn.dataset.tag;
    location.hash = tag;
  });

  // hash 改變（含返回鍵）
  window.addEventListener('hashchange', () => filter(getHashTag()));

  // 初始：若 URL 有 hash 就顯示；否則不顯示
  filter(getHashTag());
})();
</script>
