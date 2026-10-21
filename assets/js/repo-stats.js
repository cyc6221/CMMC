(function () {
  const TTL = 60 * 60 * 1000;
  const RETRY_AFTER = 10 * 60 * 1000;
  const KEY_PREFIX = 'repo-stats:v1:';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const UNITS = [
    ['year', 365 * 24 * 3600],
    ['month', 30 * 24 * 3600],
    ['day', 24 * 3600],
    ['hour', 3600],
    ['minute', 60],
  ];

  /* entry: { time, data, failedAt } -- data is kept after it expires so it can be shown when a request fails */
  function readEntry(repo) {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + repo);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeEntry(repo, entry) {
    try {
      localStorage.setItem(KEY_PREFIX + repo, JSON.stringify(entry));
    } catch (e) {
      /* storage unavailable: skip caching */
    }
  }

  async function fetchStats(repo) {
    const res = await fetch('https://api.github.com/repos/' + repo + '/commits?per_page=1', {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error('GitHub API ' + res.status);

    const commits = await res.json();
    const link = res.headers.get('Link');
    const last = link && link.match(/[?&]page=(\d+)>;\s*rel="last"/);

    return {
      count: last ? Number(last[1]) : commits.length,
      date: commits[0].commit.committer.date,
    };
  }

  /* fresh data, else the last successful data when the request fails, else null (the page keeps its snapshot) */
  async function load(repo) {
    const entry = readEntry(repo);
    const now = Date.now();
    const data = entry && entry.data ? entry.data : null;

    if (data && now - entry.time < TTL) return data;
    if (entry && entry.failedAt && now - entry.failedAt < RETRY_AFTER) return data;

    try {
      const fresh = await fetchStats(repo);
      writeEntry(repo, { time: now, data: fresh });
      return fresh;
    } catch (e) {
      writeEntry(repo, { time: entry ? entry.time : 0, data: data, failedAt: now });
      return data;
    }
  }

  function ago(iso) {
    const seconds = (Date.parse(iso) - Date.now()) / 1000;
    for (const [unit, size] of UNITS) {
      if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
    }
    return 'just now';
  }

  function render(el, data) {
    el.textContent =
      data.count.toLocaleString('en') + (data.count === 1 ? ' commit' : ' commits') +
      ' · last commit ' + data.date.slice(0, 10) + ' (' + ago(data.date) + ')';
    el.title = 'Latest commit: ' + data.date;
  }

  document.querySelectorAll('.repo-stats[data-repo]').forEach(function (el) {
    load(el.dataset.repo)
      .then(function (data) {
        if (data) render(el, data);
      })
      .catch(function () {
        /* keep the snapshot already in the page */
      });
  });
})();
