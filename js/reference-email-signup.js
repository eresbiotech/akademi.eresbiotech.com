(function () {
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
      if (!deliveryNode || !payload.asset_url) return;
      deliveryNode.hidden = false;
      deliveryNode.innerHTML = '';
      var link = document.createElement('a');
      link.className = 'email-signup-download';
      link.href = payload.asset_url;
      link.textContent = payload.asset_label || 'Dosyanızı açın';
      link.rel = 'noopener';
      deliveryNode.appendChild(link);
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
        finish();
        setState('error', 'Kayıt şu anda tamamlanamadı. Lütfen biraz sonra yeniden deneyin.');
        emit(root, 'error');
      }, 15000);
    });

    window.addEventListener('message', function (event) {
      if (!pending || !isAllowedMessageOrigin(event.origin)) return;
      var payload = event.data || {};
      if (payload.type !== 'eres-email-signup' && payload.type !== 'eres-reference-signup') return;
      if (requestId && payload.request_id && payload.request_id !== requestId) return;

      finish();

      if (payload.status === 'success' || payload.status === 'resubscribed') {
        setState('success', root.getAttribute('data-success-message') || 'Kaydınız alındı.');
        showDelivery(payload);
        emit(root, 'success');
        form.reset();
        return;
      }

      if (payload.status === 'already_subscribed') {
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
