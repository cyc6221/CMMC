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
