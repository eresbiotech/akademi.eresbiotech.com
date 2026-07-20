(function () {
  var storageKey = "eres_cookie_consent";
  var banner = document.querySelector("[data-cookie-banner]");
  var dialog = document.querySelector("[data-cookie-dialog]");
  var form = document.querySelector("[data-cookie-form]");
  var activeConsent = readConsent();
  var metaPageViewTracked = false;
  var metaViewContentTracked = false;

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

  function hasTrackingConsent(consent) {
    return !!(consent && (consent.analytics || consent.marketing));
  }

  function metaPixel() {
    return window.ERESMetaPixel && window.ERESMetaPixel.pixelId ? window.ERESMetaPixel : null;
  }

  function coursePayload() {
    var courseRoot = document.querySelector("[data-meta-content-name]");
    var checkoutLink = document.querySelector('[data-event="iyzico_checkout_click"], [data-event="payhip_checkout_click"]');
    var contentName = courseRoot ? courseRoot.getAttribute("data-meta-content-name") : "";
    if (!courseRoot || !checkoutLink || !contentName) return null;
    return {
      content_name: contentName,
      content_category: courseRoot.getAttribute("data-meta-content-category") || "Biyoinformatik Eğitimi",
      currency: "TRY"
    };
  }

  function trackMeta(eventType, eventName, payload) {
    var pixel = metaPixel();
    if (!pixel || !hasTrackingConsent(activeConsent)) return;
    pixel.init();
    pixel.track(eventType, eventName, payload || {});
  }

  function trackMetaPageView() {
    if (metaPageViewTracked) return;
    trackMeta("standard", "PageView");
    if (metaPixel() && metaPixel().initialized) metaPageViewTracked = true;
  }

  function trackMetaViewContent() {
    var payload = coursePayload();
    if (metaViewContentTracked || !payload) return;
    trackMeta("standard", "ViewContent", payload);
    if (metaPixel() && metaPixel().initialized) metaViewContentTracked = true;
  }

  function enableMetaTracking() {
    if (!hasTrackingConsent(activeConsent) || !metaPixel()) return;
    metaPixel().init();
    trackMetaPageView();
    trackMetaViewContent();
  }

  function writeConsent(consent, eventName) {
    var payload = Object.assign({
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString()
    }, consent || {});
    localStorage.setItem(storageKey, JSON.stringify(payload));
    activeConsent = payload;
    document.documentElement.dataset.cookieConsent = payload.analytics || payload.marketing ? "accepted" : "limited";
    if (banner) banner.hidden = true;
    if (dialog && dialog.open) dialog.close();
    track(eventName, {
      analytics: payload.analytics,
      marketing: payload.marketing
    });
    window.dispatchEvent(new CustomEvent("eres:consent", { detail: payload }));
    enableMetaTracking();
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
      var trackedEventName = tracked.getAttribute("data-event");
      track(trackedEventName, {
        course: tracked.getAttribute("data-course") || undefined,
        plan: tracked.getAttribute("data-plan") || undefined,
        provider: tracked.getAttribute("data-payment-provider") || undefined
      });
      if (trackedEventName === "iyzico_checkout_click" || trackedEventName === "payhip_checkout_click") {
        var initiatePayload = coursePayload() || {
          content_name: tracked.getAttribute("data-course") || document.title,
          content_category: "Biyoinformatik Eğitimi",
          currency: "TRY"
        };
        trackMeta("standard", "InitiateCheckout", initiatePayload);
      }
      if (trackedEventName === "whatsapp_click") {
        trackMeta("standard", "Contact");
      }
      if (trackedEventName === "decision_intro_click") {
        trackMeta("custom", "DecisionGuideClick", { path: "intro" });
      }
      if (trackedEventName === "decision_r_click") {
        trackMeta("custom", "DecisionGuideClick", { path: "r" });
      }
      if (trackedEventName === "decision_protein_click") {
        trackMeta("custom", "DecisionGuideClick", { path: "protein" });
      }
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

  enableMetaTracking();
})();
