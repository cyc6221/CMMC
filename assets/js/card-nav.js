(function () {
  const grid = document.querySelector(".now-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(":scope > .now-card"));
  if (!cards.length) return;

  const slug = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const nav = document.createElement("nav");
  nav.className = "card-nav";
  nav.setAttribute("aria-label", "Cards");

  const list = document.createElement("ol");
  list.className = "card-nav__list";

  // 每張卡片給一個 id，讓跳轉連結與網址 hash 都能指到它
  const links = cards.map((card, i) => {
    const h3 = card.querySelector(".now-title h3");
    const title = h3 ? h3.textContent.trim() : `Card ${i + 1}`;
    if (!card.id) card.id = slug(title) || `card-${i + 1}`;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "card-nav__link";
    a.href = `#${card.id}`;
    a.innerHTML =
      '<span class="card-nav__index" aria-hidden="true"></span>' +
      '<span class="card-nav__title"></span>';
    a.querySelector(".card-nav__index").textContent = String(i + 1).padStart(2, "0");
    a.querySelector(".card-nav__title").textContent = title;
    li.appendChild(a);
    list.appendChild(li);
    return a;
  });

  nav.appendChild(list);
  grid.parentNode.insertBefore(nav, grid);

  // 目前卡片：頂端已越過 sticky header 下緣的最後一張
  const sync = () => {
    const header = document.querySelector(".site-header");
    const line = (header ? header.offsetHeight : 0) + 25;
    let idx = -1;
    cards.forEach((card, i) => {
      if (card.getBoundingClientRect().top <= line) idx = i;
    });
    links.forEach((a, i) => a.classList.toggle("is-active", i === idx));
  };

  window.addEventListener("scroll", sync, { passive: true });
  sync();
})();
