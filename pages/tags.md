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
    {% capture t_str %}{{ t }}{% endcapture %}
    {% assign all_tags = all_tags | push: t_str %}
  {% endfor %}
{% endfor %}
{% assign all_tags = all_tags | uniq | sort %}

<div class="tags-page">
  <div class="tags-bar" id="tagsBar" aria-label="Tags">
    {% for t in all_tags %}
      {% capture t_str %}{{ t }}{% endcapture %}
      {% assign tid = t_str | slugify %}
      <button class="tag-btn" type="button" data-tag="{{ tid }}">#{{ t_str }}</button>
    {% endfor %}

    <button class="tag-btn tag-btn--clear" type="button" data-clear="1">Clear</button>
  </div>

  <div class="tags-hint" id="tagsHint">
    請先選擇一個 tag 才會顯示文章。
  </div>

  <ul id="articlesList" class="articles-list is-hidden">
    {% for a in site.articles %}
      {% assign atags = "" | split: "" %}
      {% if a.tags %}
        {% for t in a.tags %}
          {% capture t_str %}{{ t }}{% endcapture %}
          {% assign tid = t_str | slugify %}
          {% assign atags = atags | push: tid %}
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

  // --- hash 格式：/tags/#cryptography,number-theory
  function parseHash() {
    const h = (location.hash || '').replace(/^#/, '').trim();
    if (!h) return new Set();
    return new Set(h.split(',').map(s => s.trim()).filter(Boolean));
  }

  function writeHash(selected) {
    const arr = Array.from(selected);
    if (arr.length === 0) {
      history.replaceState(null, '', location.pathname + location.search);
      return;
    }
    location.hash = arr.join(',');
  }

  function setActive(selected) {
    buttons.forEach(btn => {
      btn.classList.toggle('is-active', selected.has(btn.dataset.tag));
    });
  }

  function filter(selected) {
    if (!selected || selected.size === 0) {
      setActive(new Set());
      hint.textContent = '請先選擇一個或多個 tag 才會顯示文章。';
      hint.style.display = '';
      list.classList.add('is-hidden');
      return;
    }

    setActive(selected);
    hint.style.display = 'none';
    list.classList.remove('is-hidden');

    let shown = 0;
    items.forEach(li => {
      const tags = (li.dataset.tags || '').split(/\s+/).filter(Boolean);

      // OR（任一符合就顯示）
      const ok = tags.some(t => selected.has(t));

      // AND（全部符合才顯示）=> 若你要 AND，把上面一行改成下面這行：
      // const ok = Array.from(selected).every(t => tags.includes(t));

      li.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });

    if (shown === 0) {
      hint.textContent = '目前選取的 tag 組合沒有文章。';
      hint.style.display = '';
      list.classList.add('is-hidden');
    }
  }

  // 點按鈕：可多選、可取消
  bar.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('[data-clear="1"]');
    if (clearBtn) {
      const empty = new Set();
      writeHash(empty);
      filter(empty);
      return;
    }

    const btn = e.target.closest('.tag-btn');
    if (!btn) return;

    const selected = parseHash();
    const tag = btn.dataset.tag;
    if (!tag) return; // 避免 Clear 被當成 tag

    if (selected.has(tag)) selected.delete(tag);
    else selected.add(tag);

    writeHash(selected);
    filter(selected);
  });


  // 支援返回鍵 / 直接貼 hash
  window.addEventListener('hashchange', () => filter(parseHash()));

  // 初始
  filter(parseHash());
})();
</script>
