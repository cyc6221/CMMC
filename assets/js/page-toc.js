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

  // 狀態：
  // manualOpenH2Id：使用者手動指定想展開的 h2
  // currentAutoH2Id：目前閱讀位置對應的 h2
  let manualOpenH2Id = null;
  let currentAutoH2Id = null;

  const expandOnlyH2 = (h2Id) => {
    const allItems = Array.from(toc.querySelectorAll(".page-toc__item"));

    allItems.forEach((item) => {
      const link = item.querySelector(".page-toc__link");
      const btn = item.querySelector(".page-toc__toggle");
      const subUl = item.querySelector(".page-toc__sublist");
      const isTarget = link?.getAttribute("href") === `#${h2Id}`;

      item.classList.toggle("is-expanded", isTarget);

      if (btn && subUl) {
        btn.setAttribute("aria-expanded", String(isTarget));
        subUl.hidden = !isTarget;
      }
    });
  };

  const findParentH2 = (heading) => {
    if (!heading) return null;
    if (heading.tagName === "H2") return heading;

    let prev = heading.previousElementSibling;
    while (prev && prev.tagName !== "H2") {
      prev = prev.previousElementSibling;
    }
    return prev || null;
  };

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
          subUl.hidden = true;
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

      // 手動模式：
      // 點哪個 h2，就暫時展開哪個 h2
      // 不做「全部收合」
      btn.addEventListener("click", () => {
        manualOpenH2Id = h2.id;
        expandOnlyH2(h2.id);
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
  const headingMap = new Map(allHeadings.map((h) => [h.id, h]));

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
    });

    const activeHeading = headingMap.get(id);
    const parentH2 = findParentH2(activeHeading);
    if (!parentH2) return;

    const autoH2Id = parentH2.id;

    // 若使用者有手動展開某段：
    // - 只要還在同一個 auto h2 區段，就尊重手動狀態
    // - 一旦真的進入另一個 h2 區段，就解除手動模式，回到自動模式
    if (manualOpenH2Id) {
      if (currentAutoH2Id && autoH2Id !== currentAutoH2Id) {
        manualOpenH2Id = null;
      } else {
        currentAutoH2Id = autoH2Id;
        return;
      }
    }

    currentAutoH2Id = autoH2Id;
    expandOnlyH2(autoH2Id);
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

  // 初始狀態：若有 hash，先同步到該 heading；
  // 否則預設展開第一個 h2（可避免一開始全部收合）
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) {
      setActive(id);
    }
  } else if (h2s[0]) {
    currentAutoH2Id = h2s[0].id;
    expandOnlyH2(h2s[0].id);
  }
})();