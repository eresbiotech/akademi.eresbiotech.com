(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ERESBioExpoFinalDays = factory();
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  var deadline = new Date("2026-07-16T23:59:00+03:00").getTime();
  var finalDayStart = new Date("2026-07-16T00:00:00+03:00").getTime();
  var finalHoursStart = new Date("2026-07-16T18:00:00+03:00").getTime();

  function getState(nowMs) {
    if (nowMs > deadline) {
      return { state: "expired", label: "BioExpo destekli kayıt dönemi tamamlandı." };
    }
    if (nowMs >= finalHoursStart) {
      return { state: "final-hours", label: "SON SAATLER" };
    }
    if (nowMs >= finalDayStart) {
      return { state: "final-day", label: "BUGÜN SON GÜN" };
    }
    return { state: "active", label: "SON 2 GÜN" };
  }

  function formatCountdown(nowMs) {
    var remaining = Math.max(0, deadline - nowMs);
    var totalMinutes = Math.floor(remaining / 60000);
    var days = Math.floor(totalMinutes / 1440);
    var hours = Math.floor((totalMinutes % 1440) / 60);
    var minutes = totalMinutes % 60;
    if (days > 0) return days + " gün " + hours + " saat kaldı";
    if (hours > 0) return hours + " saat " + minutes + " dakika kaldı";
    return minutes + " dakika kaldı";
  }

  function applyState(doc, nowMs) {
    var result = getState(nowMs);
    var rootEl = doc.documentElement;
    rootEl.setAttribute("data-bioexpo-state", result.state);
    updateCookieOffset(doc);

    doc.querySelectorAll("[data-bioexpo-state-label]").forEach(function (node) {
      node.textContent = result.label;
    });

    doc.querySelectorAll("[data-bioexpo-countdown]").forEach(function (node) {
      node.textContent = result.state === "expired" ? result.label : formatCountdown(nowMs);
    });

    doc.querySelectorAll("[data-bioexpo-active]").forEach(function (node) {
      node.hidden = result.state === "expired";
    });

    doc.querySelectorAll("[data-bioexpo-expired]").forEach(function (node) {
      node.hidden = result.state !== "expired";
    });

    return result;
  }

  function updateCookieOffset(doc) {
    if (!doc || !doc.documentElement || typeof window === "undefined") return;
    var banner = doc.querySelector("[data-cookie-banner]");
    var offset = 0;
    if (banner && !banner.hidden) {
      offset = Math.ceil(banner.getBoundingClientRect().height) + 96;
    }
    doc.documentElement.style.setProperty("--bioexpo-cookie-offset", offset + "px");
  }

  function init() {
    if (typeof document === "undefined") return;
    var render = function () {
      applyState(document, Date.now());
    };
    render();
    observeCookieBanner(document);
    window.setInterval(render, 60000);
    window.addEventListener("resize", function () {
      updateCookieOffset(document);
    });
    window.addEventListener("eres:consent", function () {
      updateCookieOffset(document);
    });
    window.setTimeout(function () {
      updateCookieOffset(document);
    }, 100);
    window.setTimeout(function () {
      updateCookieOffset(document);
    }, 600);
  }

  function observeCookieBanner(doc) {
    if (typeof MutationObserver === "undefined") return;
    var banner = doc.querySelector("[data-cookie-banner]");
    if (!banner) return;
    var observer = new MutationObserver(function () {
      updateCookieOffset(doc);
    });
    observer.observe(banner, { attributes: true, attributeFilter: ["hidden"] });
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
      init();
    }
  }

  return {
    deadline: "2026-07-16T23:59:00+03:00",
    getState: getState,
    formatCountdown: formatCountdown,
    applyState: applyState,
    updateCookieOffset: updateCookieOffset,
    observeCookieBanner: observeCookieBanner
  };
});
