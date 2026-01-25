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

  headings.forEach((h) => {
    const li = document.createElement("li");
    li.className = "page-toc__item";

    const a = document.createElement("a");
    a.className = "page-toc__link";
    a.href = `#${h.id}`;
    a.textContent = h.textContent || "";

    li.appendChild(a);
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

  headings.forEach((h) => io.observe(h));
})();
