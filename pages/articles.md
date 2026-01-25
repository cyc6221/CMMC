---
layout: page
title: Articles
permalink: /articles/
toc: false
---

<form id="sortForm" class="articles-sort" style="margin: 1rem 0; display:flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <label>
    排序依據：
    <select name="sort">
      <option value="date">日期</option>
      <option value="title">標題</option>
    </select>
  </label>

  <label>
    順序：
    <select name="order">
      <option value="desc">倒序</option>
      <option value="asc">正序</option>
    </select>
  </label>

  <button type="submit">套用</button>
</form>

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
  const form = document.getElementById('sortForm');
  const list = document.getElementById('articlesList');

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      sort: params.get('sort') || 'date',   // 'date' | 'title'
      order: params.get('order') || 'desc', // 'asc' | 'desc'
    };
  }

  function setParams(sort, order) {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', sort);
    params.set('order', order);
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newUrl);
  }

  function parseDate(s) {
    // s: 'YYYY-MM-DD' or ''
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
        // tie-breaker: date desc
        const ad = parseDate(a.dataset.date) ?? -Infinity;
        const bd = parseDate(b.dataset.date) ?? -Infinity;
        return bd - ad;
      }

      // sortKey === 'date'
      const ad = parseDate(a.dataset.date);
      const bd = parseDate(b.dataset.date);

      // 沒 date 的文章：放最後（不管 asc/desc）
      const aHas = ad !== null;
      const bHas = bd !== null;
      if (aHas && bHas) return ad - bd;
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

      // 都沒 date：用 title asc 當 fallback
      const at = (a.dataset.title || '').toLowerCase();
      const bt = (b.dataset.title || '').toLowerCase();
      if (at < bt) return -1;
      if (at > bt) return 1;
      return 0;
    });

    if (order === 'desc') items.reverse();

    // 重排 DOM
    const frag = document.createDocumentFragment();
    items.forEach(li => frag.appendChild(li));
    list.appendChild(frag);
  }

  // init from URL
  const initial = getParams();
  form.sort.value = initial.sort;
  form.order.value = initial.order;
  sortList(initial.sort, initial.order);

  // submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const sort = form.sort.value;
    const order = form.order.value;
    setParams(sort, order);
    sortList(sort, order);
  });
})();
</script>
