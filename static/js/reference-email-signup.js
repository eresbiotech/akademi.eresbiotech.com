(function () {
  // All Google registration forms open in a new tab, keeping ERES open.
  document.querySelectorAll('a[href]').forEach(function (link) {
    try {
      var u = new URL(link.href, window.location.href);
      if (u.protocol === 'https:' &&
          (u.hostname === 'forms.gle' ||
           (u.hostname === 'docs.google.com' && u.pathname.indexOf('/forms/') === 0))) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    } catch (ignored) { /* Invalid/relative links are not modified. */ }
  });
  var roots = document.querySelectorAll('[data-email-signup]');
  if (!roots.length) return;

  function isAllowedMessageOrigin(origin) {
    try {
      var host = new URL(origin).hostname;
      return origin.indexOf('https://') === 0 && (
        host === 'script.google.com' ||
        host === 'script.googleusercontent.com' ||
        host.endsWith('-script.googleusercontent.com')
      );
    } catch (error) {
      return false;
    }
  }

  function makeRequestId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'eres-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  function emit(root, suffix) {
    var context = root.getAttribute('data-signup-context') || 'site';
    var detail = {
      event: 'email_signup_' + suffix,
      signup_context: context,
      source_url: window.location.href
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent('eres:event', { detail: detail }));

    if (context === 'reference' || context === 'reference_hub') {
      var legacy = {
        event: 'reference_signup_' + suffix,
        article_id: document.querySelector('[data-reference-id]') ? document.querySelector('[data-reference-id]').getAttribute('data-reference-id') : undefined,
        source_url: window.location.href
      };
      window.dataLayer.push(legacy);
      window.dispatchEvent(new CustomEvent('eres:event', { detail: legacy }));
    }
  }

  roots.forEach(function (root) {
    var form = root.querySelector('[data-email-signup-form]');
    if (!form) return;

    var statusNode = root.querySelector('[data-email-signup-status]');
    var deliveryNode = root.querySelector('[data-email-signup-delivery]');
    var targetIframe = root.querySelector('iframe.email-signup-target');
    var isPlanner = root.getAttribute('data-signup-context') === 'planner';
    var submitButton = form.querySelector('button[type="submit"]');
    var sourceUrl = form.querySelector('[data-email-signup-source-url]');
    var requestInput = form.querySelector('[data-email-signup-request-id]');
    var pending = false;
    var timeoutId = null;
    var requestId = '';
    var viewTracked = false;

    function setState(state, message) {
      if (!statusNode) return;
      statusNode.dataset.state = state || '';
      statusNode.textContent = message || '';
    }

    function finish() {
      pending = false;
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = null;
      if (submitButton) submitButton.disabled = false;
    }

    function showDelivery(payload) {
      // Planner's PDF is a first-party, published resource. The Apps Script
      // response need not know its URL, including for existing subscribers.
      var assetUrl = isPlanner
        ? '/downloads/eres-akademi-planner-2026-2027.pdf'
        : payload.asset_url;
      if (!deliveryNode || !assetUrl) return;
      deliveryNode.hidden = false;
      deliveryNode.innerHTML = '';
      var link = document.createElement('a');
      link.className = 'email-signup-download';
      link.href = assetUrl;
      link.textContent = payload.asset_label || 'Dosyanızı açın';
      link.rel = 'noopener';
      deliveryNode.appendChild(link);
    }

    // An embedded Google Apps Script can accept the POST (as confirmed in
    // Consent Log) yet fail to relay postMessage to the top page. A completed
    // iframe request offers a PDF fallback WITHOUT falsely claiming that the
    // subscriber was saved. The download is always offered as a visible link.
    function plannerDeliveryFallback() {
      if (!pending || !isPlanner) return;
      finish();
      showDelivery({});
      setState('warning',
        'Ajandanız hazır. E-posta kaydının yanıtı tarayıcıda doğrulanamadı; indirme bağlantısını aşağıda bulabilirsiniz.');
      emit(root, 'delivery_ready');
    }

    if (targetIframe && isPlanner) {
      targetIframe.addEventListener('load', function () {
        if (!pending) return;
        // Prefer a verified Google postMessage when it is available.
        window.setTimeout(function () {
          if (pending) plannerDeliveryFallback();
        }, 2000);
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !viewTracked) {
            viewTracked = true;
            emit(root, 'view');
            observer.disconnect();
          }
        });
      }, { threshold: 0.25 });
      observer.observe(root);
    } else {
      viewTracked = true;
      emit(root, 'view');
    }

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return;
      if (pending) {
        event.preventDefault();
        return;
      }

      requestId = makeRequestId();
      if (requestInput) requestInput.value = requestId;
      if (sourceUrl) sourceUrl.value = window.location.href;
      if (deliveryNode) {
        deliveryNode.hidden = true;
        deliveryNode.innerHTML = '';
      }

      pending = true;
      if (submitButton) submitButton.disabled = true;
      setState('', 'Kaydınız gönderiliyor…');
      emit(root, 'submit');

      timeoutId = window.setTimeout(function () {
        if (!pending) return;
        if (isPlanner) {
          // Even if the cross-origin iframe does not signal load, do not trap
          // visitors with the generic error and no PDF link.
          plannerDeliveryFallback();
          return;
        }
        finish();
        setState('error', 'Kayıt şu anda tamamlanamadı. Lütfen biraz sonra yeniden deneyin.');
        emit(root, 'error');
      }, 15000);
    });

    window.addEventListener('message', function (event) {
      if (!pending || !isAllowedMessageOrigin(event.origin)) return;
      var payload = event.data || {};
      if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch (ignored) { return; }
      }
      if (!payload || typeof payload !== 'object') return;
      if (payload.type !== 'eres-email-signup' && payload.type !== 'eres-reference-signup') return;
      if (requestId && payload.request_id && payload.request_id !== requestId) return;

      finish();

      if (payload.status === 'success' || payload.status === 'resubscribed' || payload.status === 'subscribed') {
        setState('success', root.getAttribute('data-success-message') || 'Kaydınız alındı.');
        showDelivery(payload);
        emit(root, 'success');
        form.reset();
        return;
      }

      if (payload.status === 'already_subscribed' || payload.status === 'duplicate_active') {
        setState('success', root.getAttribute('data-existing-message') || 'Bu e-posta zaten listede.');
        showDelivery(payload);
        emit(root, 'success');
        form.reset();
        return;
      }

      setState('error', 'Kayıt şu anda tamamlanamadı. Lütfen biraz sonra yeniden deneyin.');
      emit(root, 'error');
    });
  });
})();
