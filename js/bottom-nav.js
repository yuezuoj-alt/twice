/**
 * BottomNav — 底部导航图标：选中 / 未选中均使用 images/ 内 PNG
 */
(function (global) {
  "use strict";

  var I = "images/";

  var NAV_ICONS = {
    appointment: { on: I + "预约.png", off: I + "预约未点击.png" },
    schedule: { on: I + "接种时间表.png", off: I + "接种时间表未点击.png" },
    growth: { on: I + "成长曲线.png", off: I + "成长曲线未点击.png" },
    profile: { on: I + "我的.png", off: I + "我的未点击.png" }
  };

  function syncNavIcons(navEl) {
    if (!navEl) return;
    navEl.querySelectorAll(".nav-item[data-nav]").forEach(function (item) {
      var key = item.dataset.nav;
      var cfg = NAV_ICONS[key];
      if (!cfg) return;

      var wrap = item.querySelector(".nav-icon");
      if (!wrap) return;

      var img = wrap.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        img.alt = "";
        wrap.textContent = "";
        wrap.appendChild(img);
      }

      img.src = item.classList.contains("active") ? cfg.on : cfg.off;
    });
  }

  function initBottomNav() {
    document.querySelectorAll(".bottom-nav").forEach(syncNavIcons);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBottomNav);
  } else {
    initBottomNav();
  }

  global.BottomNav = {
    NAV_ICONS: NAV_ICONS,
    syncNavIcons: syncNavIcons,
    initBottomNav: initBottomNav
  };
})(typeof window !== "undefined" ? window : globalThis);
