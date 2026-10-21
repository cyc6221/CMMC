(function () {
  const TTL = 60 * 60 * 1000;
  const KEY_PREFIX = 'repo-stats:';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const UNITS = [
    ['year', 365 * 24 * 3600],
    ['month', 30 * 24 * 3600],
    ['day', 24 * 3600],
    ['hour', 3600],
    ['minute', 60],
  ];

  function readCache(repo) {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + repo);
      if (!raw) return null;
      const entry = JSON.parse(raw);
      return Date.now() - entry.time < TTL ? entry.data : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(repo, data) {
    try {
      localStorage.setItem(KEY_PREFIX + repo, JSON.stringify({ time: Date.now(), data: data }));
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

  function ago(iso) {
    const seconds = (Date.parse(iso) - Date.now()) / 1000;
    for (const [unit, size] of UNITS) {
      if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
    }
    return 'just now';
  }

  function render(el, data) {
    el.textContent =
      data.count.toLocaleString('en') + ' commits · last commit ' + data.date.slice(0, 10) + ' (' + ago(data.date) + ')';
    el.title = 'Latest commit: ' + data.date;
  }

  document.querySelectorAll('.repo-stats[data-repo]').forEach(function (el) {
    const repo = el.dataset.repo;
    const cached = readCache(repo);
    if (cached) {
      render(el, cached);
      return;
    }
    fetchStats(repo)
      .then(function (data) {
        writeCache(repo, data);
        render(el, data);
      })
      .catch(function () {
        /* leave the line empty; CSS hides it */
      });
  });
})();
