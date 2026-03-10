(function () {
  const content = document.querySelector("#page-content");
  const toc = document.querySelector("#page-toc");
  if (!content || !toc) return;

  const headings = Array.from(content.querySelectorAll("h2"));

  if (headings.length === 0) {
    toc.closest(".page-toc")?.classList.add("is-empty");
    return;
  }

  const slugify = (s) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
      .replace(/\s+/g, "-");

  headings.forEach((h) => {
    if (!h.id) h.id = slugify(h.textContent || "");
  });

  const ul = document.createElement("ul");
  ul.className = "page-toc__list";

  // Build TOC with h2 as parent items and optional h3 sublists
  headings.forEach((h2) => {
    const li = document.createElement("li");
    li.className = "page-toc__item";

    // toggle button for revealing h3 (triangle)
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "page-toc__toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="tri">▸</span>'; // simple triangle, can replace with SVG

    const a = document.createElement("a");
    a.className = "page-toc__link";
    a.href = `#${h2.id}`;
    a.textContent = h2.textContent || "";

    li.appendChild(btn);
    li.appendChild(a);

    // Collect following h3 elements until next h2
    let subUl = null;
    let el = h2.nextElementSibling;
    while (el && el.tagName !== "H2") {
      if (el.tagName === "H3") {
        if (!subUl) {
          subUl = document.createElement("ul");
          subUl.className = "page-toc__sublist";
        }
        if (!el.id) el.id = slugify(el.textContent || "");
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
      // toggle behavior
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        li.classList.toggle("is-expanded", !expanded);
      });
    } else {
      // hide button when no children
      btn.style.visibility = "hidden";
      btn.setAttribute("aria-hidden", "true");
    }

    ul.appendChild(li);
  });

  toc.innerHTML = "";
  toc.appendChild(ul);

  // 目前章節高亮（可留著）
  const links = Array.from(toc.querySelectorAll("a"));
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;

      const id = visible.target.id;
      links.forEach((l) =>
        l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`)
      );
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
  );

  // observe both h2 and h3 so subitems can be highlighted
  const observeTargets = Array.from(content.querySelectorAll("h2, h3"));
  observeTargets.forEach((h) => io.observe(h));
})();
