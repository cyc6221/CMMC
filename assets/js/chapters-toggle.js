(function () {
  const toggles = document.querySelectorAll("details.chap-toggle");
  if (!toggles.length) return;

  toggles.forEach((details) => {
    const summary = details.querySelector("summary.chap-toggle__summary");
    const btn = details.querySelector("button.chap-toggle__btn");
    if (!summary || !btn) return;

    // 阻止點 summary 任意位置就展開（包含點連結）
    summary.addEventListener("click", (e) => {
      // 如果點的是按鈕，讓按鈕 handler 處理
      if (e.target === btn || btn.contains(e.target)) return;

      // 其他地方（包含 <a>）不要 toggle
      e.preventDefault();
    });

    const sync = () => {
      btn.setAttribute("aria-expanded", details.open ? "true" : "false");
    };

    // 只有點按鈕才 toggle
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      details.open = !details.open;
      sync();
    });

    sync();
  });
})();
