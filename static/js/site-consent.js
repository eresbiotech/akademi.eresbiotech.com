(function () {
  var storageKey = "eres_cookie_consent";
  var banner = document.querySelector("[data-cookie-banner]");
  var dialog = document.querySelector("[data-cookie-dialog]");
  var form = document.querySelector("[data-cookie-form]");

  function track(eventName, detail) {
    if (!eventName) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, detail || {}));
    window.dispatchEvent(new CustomEvent("eres:event", { detail: Object.assign({ event: eventName }, detail || {}) }));
  }

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      return null;
    }
  }

  function writeConsent(consent, eventName) {
    var payload = Object.assign({
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString()
    }, consent || {});
    localStorage.setItem(storageKey, JSON.stringify(payload));
    document.documentElement.dataset.cookieConsent = payload.analytics || payload.marketing ? "accepted" : "limited";
    if (banner) banner.hidden = true;
    if (dialog && dialog.open) dialog.close();
    track(eventName, {
      analytics: payload.analytics,
      marketing: payload.marketing
    });
    window.dispatchEvent(new CustomEvent("eres:consent", { detail: payload }));
  }

  function openPreferences() {
    var current = readConsent() || {};
    if (form) {
      if (form.elements.analytics) form.elements.analytics.checked = !!current.analytics;
      if (form.elements.marketing) form.elements.marketing.checked = !!current.marketing;
    }
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    } else if (dialog) {
      dialog.setAttribute("open", "");
    }
    track("cookie_preferences");
  }

  document.addEventListener("click", function (event) {
    var tracked = event.target.closest("[data-event]");
    if (tracked && !tracked.matches("[data-cookie-accept], [data-cookie-reject], [data-cookie-preferences]")) {
      track(tracked.getAttribute("data-event"), {
        course: tracked.getAttribute("data-course") || undefined,
        plan: tracked.getAttribute("data-plan") || undefined,
        provider: tracked.getAttribute("data-payment-provider") || undefined
      });
    }

    if (event.target.closest("[data-cookie-accept]")) {
      writeConsent({ analytics: true, marketing: true }, "cookie_accept");
    }

    if (event.target.closest("[data-cookie-reject]")) {
      writeConsent({ analytics: false, marketing: false }, "cookie_reject");
    }

    if (event.target.closest("[data-cookie-preferences]")) {
      openPreferences();
    }

    if (event.target.closest("[data-cookie-close]") && dialog) {
      dialog.close();
    }
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      writeConsent({
        analytics: !!form.elements.analytics.checked,
        marketing: !!form.elements.marketing.checked
      }, "cookie_preferences");
    });
  }

  if (!readConsent() && banner) {
    banner.hidden = false;
  }
})();
