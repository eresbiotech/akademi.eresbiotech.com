(function () {
  var root = document.querySelector('[data-reference-signup]');
  if (!root) return;

  var form = root.querySelector('[data-reference-signup-form]');
  var statusNode = root.querySelector('[data-reference-signup-status]');
  var submitButton = form ? form.querySelector('button[type="submit"]') : null;
  var sourceUrl = form ? form.querySelector('[data-reference-source-url]') : null;
  var articleId = root.getAttribute('data-article-id') || undefined;
  var timeoutId = null;
  var pending = false;
  var viewTracked = false;

  function track(eventName) {
    var detail = {
      event: eventName,
      article_id: articleId,
      source_url: window.location.href
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent('eres:event', { detail: detail }));
  }

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

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !viewTracked) {
          viewTracked = true;
          track('reference_signup_view');
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(root);
  } else {
    viewTracked = true;
    track('reference_signup_view');
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return;
      if (pending) {
        event.preventDefault();
        return;
      }
      if (sourceUrl) sourceUrl.value = window.location.href;
      pending = true;
      if (submitButton) submitButton.disabled = true;
      setState('', 'Kaydınız gönderiliyor…');
      track('reference_signup_submit');
      timeoutId = window.setTimeout(function () {
        if (!pending) return;
        finish();
        setState('error', 'Kayıt şu anda tamamlanamadı. Lütfen biraz sonra yeniden deneyin.');
        track('reference_signup_error');
      }, 15000);
    });
  }

  window.addEventListener('message', function (event) {
    if (!pending) return;
    if (!/^https:\/\/script\.google(?:usercontent)?\.com$/.test(event.origin)) return;
    var payload = event.data || {};
    if (payload.type !== 'eres-reference-signup') return;

    finish();

    if (payload.status === 'success' || payload.status === 'resubscribed') {
      setState('success', 'Kaydınız alındı. Yeni Reference yazılarında görüşmek üzere.');
      track('reference_signup_success');
      form.reset();
      return;
    }

    if (payload.status === 'already_subscribed') {
      setState('success', 'Bu e-posta zaten listede. Yeni Reference yazılarında görüşmek üzere.');
      track('reference_signup_success');
      form.reset();
      return;
    }

    setState('error', 'Kayıt şu anda tamamlanamadı. Lütfen biraz sonra yeniden deneyin.');
    track('reference_signup_error');
  });
})();
