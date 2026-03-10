(function () {
  const content = document.querySelector("#page-content");
  const toc = document.querySelector("#page-toc");
  if (!content || !toc) return;

  const h2s = Array.from(content.querySelectorAll("h2"));

  if (h2s.length === 0) {
    toc.closest(".page-toc")?.classList.add("is-empty");
    return;
  }

  const slugify = (s) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
      .replace(/\s+/g, "-");

  // 確保 h2 / h3 都有 id
  const allHeadings = Array.from(content.querySelectorAll("h2, h3"));
  allHeadings.forEach((h) => {
    if (!h.id) h.id = slugify(h.textContent || "");
  });

  const ul = document.createElement("ul");
  ul.className = "page-toc__list";

  h2s.forEach((h2) => {
    const li = document.createElement("li");
    li.className = "page-toc__item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "page-toc__toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Toggle subsection");
    btn.innerHTML = `
      <span class="tri" aria-hidden="true">
        <svg viewBox="0 0 20 20" class="tri-icon" focusable="false">
          <path d="M7 4.5L14 10L7 15.5Z"></path>
        </svg>
      </span>
    `;

    const a = document.createElement("a");
    a.className = "page-toc__link";
    a.href = `#${h2.id}`;
    a.textContent = h2.textContent || "";

    const row = document.createElement("div");
    row.className = "page-toc__row";

    row.appendChild(btn);
    row.appendChild(a);

    li.appendChild(row);

    let subUl = null;
    let el = h2.nextElementSibling;

    while (el && el.tagName !== "H2") {
      if (el.tagName === "H3") {
        if (!subUl) {
          subUl = document.createElement("ul");
          subUl.className = "page-toc__sublist";
          subUl.hidden = true; // 預設收合
        }

        const subLi = document.createElement("li");
        subLi.className = "page-toc__subitem";

        const subA = document.createElement("a");
        subA.className = "page-toc__sublink";
        subA.href = `#${el.id}`;
        subA.textContent = el.textContent || "";

        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      }
      el = el.nextElementSibling;
    }

    if (subUl) {
      li.appendChild(subUl);

      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const next = !expanded;

        btn.setAttribute("aria-expanded", String(next));
        li.classList.toggle("is-expanded", next);
        subUl.hidden = !next;
      });
    } else {
      btn.style.visibility = "hidden";
      btn.setAttribute("aria-hidden", "true");
      btn.tabIndex = -1;
    }

    ul.appendChild(li);
  });

  toc.innerHTML = "";
  toc.appendChild(ul);

  const links = Array.from(toc.querySelectorAll("a"));
  const headingMap = new Map(
    allHeadings.map((h) => [h.id, h])
  );

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
    });

    // 若目前 active 是 h3，自動展開對應父層 h2
    const activeHeading = headingMap.get(id);
    if (activeHeading && activeHeading.tagName === "H3") {
      let prev = activeHeading.previousElementSibling;
      while (prev && prev.tagName !== "H2") {
        prev = prev.previousElementSibling;
      }

      if (prev) {
        const parentLink = toc.querySelector(`.page-toc__link[href="#${prev.id}"]`);
        const parentLi = parentLink?.closest(".page-toc__item");
        const parentBtn = parentLi?.querySelector(".page-toc__toggle");
        const subUl = parentLi?.querySelector(".page-toc__sublist");

        if (parentLi && parentBtn && subUl) {
          parentLi.classList.add("is-expanded");
          parentBtn.setAttribute("aria-expanded", "true");
          subUl.hidden = false;
        }
      }
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (!visible) return;
      setActive(visible.target.id);
    },
    {
      rootMargin: "0px 0px -70% 0px",
      threshold: 0.1,
    }
  );

  allHeadings.forEach((h) => io.observe(h));

  // 載入頁面若已有 hash，先同步狀態
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) setActive(id);
  }
})();