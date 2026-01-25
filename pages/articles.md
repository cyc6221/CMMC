---
layout: page
title: Articles
permalink: /articles/
toc: false
---

<style>
  .articles-controls{
    display:flex;
    gap:.75rem;
    flex-wrap:wrap;
    align-items:center;
    margin: 1rem 0 1.25rem;
    justify-content: center;
  }
  .articles-controls .group{
    display:flex;
    gap:.5rem;
    align-items:center;
  }
  .articles-controls .sep{
    width:1px;
    height:28px;
    background: rgba(127,127,127,.35);
    margin: 0 .25rem;
  }
  .pill{
    display:inline-flex;
    align-items:center;
    padding:.35rem .7rem;
    border-radius:999px;
    border:1px solid rgba(127,127,127,.35);
    background: rgba(127,127,127,.08);
    cursor:pointer;
    user-select:none;
    font-size: 0.95rem;
    line-height: 1;
    transition: transform .05s ease, background .15s ease, border-color .15s ease;
  }
  .pill:hover{ transform: translateY(-1px); }
  .pill:active{ transform: translateY(0px); }
  .pill.active{
    border-color: rgba(16,185,129,.9);
    background: rgba(16,185,129,.18);
    font-weight: 700;
  }

  .pill button{
    all: unset;
    cursor:pointer;
  }
  .pill[role="button"]{ color: inherit; }
</style>

<div class="articles-controls" id="articlesControls" aria-label="Article sorting controls">
  <div class="group" aria-label="Sort key">
    <span class="pill" role="button" data-sort="date" data-order="">
      <button type="button">日期</button>
    </span>
    <span class="pill" role="button" data-sort="title" data-order="">
      <button type="button">標題</button>
    </span>
  </div>

  <div class="sep" aria-hidden="true"></div>

  <div class="group" aria-label="Order">
    <span class="pill" role="button" data-sort="" data-order="asc">
      <button type="button">正序</button>
    </span>
    <span class="pill" role="button" data-sort="" data-order="desc">
      <button type="button">倒序</button>
    </span>
  </div>
</div>

<ul id="articlesList">
  {% for a in site.articles %}
    <li
      data-title="{{ a.title | escape }}"
      data-date="{% if a.date %}{{ a.date | date: '%Y-%m-%d' }}{% else %}{% endif %}"
    >
      <a href="{{ a.url | relative_url }}">{{ a.title }}</a>
      {% if a.date %}<small> — {{ a.date | date: "%Y-%m-%d" }}</small>{% endif %}
    </li>
  {% endfor %}
</ul>

<script>
(function () {
  const controls = document.getElementById('articlesControls');
  const list = document.getElementById('articlesList');

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      sort: params.get('sort') || 'date',
      order: params.get('order') || 'desc',
    };
  }

  function setParams(sort, order) {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', sort);
    params.set('order', order);
    window.location.href = window.location.pathname + '?' + params.toString();
  }

  function parseDate(s) {
    if (!s) return null;
    const t = Date.parse(s + 'T00:00:00Z');
    return Number.isNaN(t) ? null : t;
  }

  function sortList(sortKey, order) {
    const items = Array.from(list.querySelectorAll('li'));

    items.sort((a, b) => {
      if (sortKey === 'title') {
        const at = (a.dataset.title || '').toLowerCase();
        const bt = (b.dataset.title || '').toLowerCase();
        if (at < bt) return -1;
        if (at > bt) return 1;
        const ad = parseDate(a.dataset.date) ?? -Infinity;
        const bd = parseDate(b.dataset.date) ?? -Infinity;
        return bd - ad; // tie-breaker
      }

      // sortKey === 'date'
      const ad = parseDate(a.dataset.date);
      const bd = parseDate(b.dataset.date);

      // 沒 date 的文章：固定放最後
      const aHas = ad !== null;
      const bHas = bd !== null;
      if (aHas && bHas) return ad - bd;
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

      const at = (a.dataset.title || '').toLowerCase();
      const bt = (b.dataset.title || '').toLowerCase();
      if (at < bt) return -1;
      if (at > bt) return 1;
      return 0;
    });

    if (order === 'desc') items.reverse();

    const frag = document.createDocumentFragment();
    items.forEach(li => frag.appendChild(li));
    list.appendChild(frag);
  }

  function renderActive(sort, order) {
    const pills = controls.querySelectorAll('.pill');
    pills.forEach(p => p.classList.remove('active'));

    // sort pills
    controls.querySelectorAll('[data-sort]').forEach(p => {
      if (p.dataset.sort === sort) p.classList.add('active');
    });

    // order pills
    controls.querySelectorAll('[data-order]').forEach(p => {
      if (p.dataset.order === order) p.classList.add('active');
    });
  }

  // init
  const { sort, order } = getParams();
  renderActive(sort, order);
  sortList(sort, order);

  // click -> update params -> reload
  controls.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    const cur = getParams();
    const nextSort = pill.dataset.sort ? pill.dataset.sort : cur.sort;
    const nextOrder = pill.dataset.order ? pill.dataset.order : cur.order;

    if (nextSort === cur.sort && nextOrder === cur.order) return;
    setParams(nextSort, nextOrder);
  });
})();
</script>
