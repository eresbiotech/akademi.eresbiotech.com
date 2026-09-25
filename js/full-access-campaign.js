(() => {
  const bars = document.querySelectorAll('[data-full-access-promo]');

  const formatRemaining = (milliseconds, mobile) => {
    const totalMinutes = Math.max(0, Math.floor(milliseconds / 60000));
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (mobile) {
      return `${days}g ${hours}s ${minutes}dk kaldı`;
    }

    return `${days} gün ${hours} saat ${minutes} dakika`;
  };

  const update = () => {
    const mobile = window.matchMedia('(max-width: 599px)').matches;

    bars.forEach((bar) => {
      const deadline = Date.parse(bar.dataset.fullAccessDeadline);
      const remaining = deadline - Date.now();

      if (!Number.isFinite(deadline) || remaining <= 0) {
        bar.hidden = true;
        return;
      }

      const countdown = bar.querySelector('[data-full-access-countdown]');
      if (countdown) {
        countdown.textContent = formatRemaining(remaining, mobile);
      }
    });
  };

  update();
  window.setInterval(update, 60000);
})();
