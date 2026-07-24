(function (root) {
  "use strict";

  var HOUR_MS = 60 * 60 * 1000;
  var MINUTE_MS = 60 * 1000;

  function getEarlyWindowState(startValue, hours, nowValue) {
    var start = new Date(startValue).getTime();
    var now = nowValue instanceof Date ? nowValue.getTime() : new Date(nowValue || Date.now()).getTime();
    var elapsedHours = (now - start) / HOUR_MS;
    var end = start + hours * HOUR_MS;

    if (!Number.isFinite(start) || !Number.isFinite(now) || !Number.isFinite(hours)) {
      return { key: "invalid", active: false, end: null };
    }

    if (elapsedHours < 0) {
      return {
        key: "prelaunch",
        active: false,
        title: "Ağustos canlı grubu kısa süre içinde katılıma açılacak.",
        message: "Canlı çalışma için duyuruları takip edin.",
        end: end
      };
    }

    if (elapsedHours < 4) {
      return {
        key: "0-4",
        active: true,
        title: "Ağustos canlı grubu katılıma açıldı.",
        message: "İlk 72 saatte yerini ayıran katılımcıların önceden ilettiği sorular, canlı vaka akışının hazırlanmasında öncelikli olarak değerlendirilir.",
        end: end
      };
    }

    if (elapsedHours < 24) {
      return {
        key: "4-24",
        active: true,
        title: "İlk duyuru günü devam ediyor.",
        message: "20 kişiyle sınırlı canlı grup için erken katılım avantajı sürüyor.",
        end: end
      };
    }

    if (elapsedHours < 48) {
      return {
        key: "24-48",
        active: true,
        title: "Erken katılım penceresinin ikinci günü.",
        message: "Çalışma öncesi soru önceliğinden yararlanmak için 72 saatlik pencere devam ediyor.",
        end: end
      };
    }

    if (elapsedHours < hours) {
      return {
        key: "48-72",
        active: true,
        title: "Soru önceliği için son 24 saat.",
        message: "Erken katılım penceresi sona ermeden canlı çalışma için yerinizi ayırın.",
        end: end
      };
    }

    return {
      key: "ended",
      active: false,
      title: "Erken katılım penceresi sona erdi.",
      message: "Canlı çalışma için katılım, 20 kişilik grup dolana kadar devam ediyor.",
      end: end
    };
  }

  function formatCountdown(end, now) {
    var remaining = Math.max(0, end - now);
    var hours = Math.floor(remaining / HOUR_MS);
    var minutes = Math.floor((remaining % HOUR_MS) / MINUTE_MS);
    return "Erken katılım avantajının sona ermesine: " + hours + " saat " + minutes + " dakika";
  }

  function getCapacityState(remainingPlaces, capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new TypeError("capacity must be a positive integer");
    }
    if (remainingPlaces === null) {
      return { key: "unknown", salesOpen: true, label: capacity + " kişiyle sınırlı" };
    }
    if (!Number.isInteger(remainingPlaces) || remainingPlaces < 0 || remainingPlaces > capacity) {
      throw new TypeError("remaining_places must be null or an integer between 0 and capacity");
    }
    if (remainingPlaces === 0) {
      return { key: "sold-out", salesOpen: false, label: "Ağustos grubu doldu" };
    }
    if (remainingPlaces >= 10) {
      return { key: "open", salesOpen: true, label: "Katılım açık · " + remainingPlaces + " yer kaldı" };
    }
    if (remainingPlaces >= 6) {
      return { key: "more-than-half", salesOpen: true, label: "Grubun yarısından fazlası ayrıldı · " + remainingPlaces + " yer kaldı" };
    }
    if (remainingPlaces >= 3) {
      return { key: "last-places", salesOpen: true, label: "Son " + remainingPlaces + " yer" };
    }
    return { key: "few-places", salesOpen: true, label: "Yalnızca " + remainingPlaces + " yer kaldı" };
  }

  function updateLaunch(section) {
    var start = section.dataset.earlyWindowStart;
    var hours = Number(section.dataset.earlyWindowHours);
    var state = getEarlyWindowState(start, hours, new Date());
    var title = section.querySelector("[data-nida-urgency-title]");
    var message = section.querySelector("[data-nida-urgency-message]");
    var countdown = section.querySelector("[data-nida-countdown]");
    var benefit = section.querySelector("[data-nida-early-benefit]");

    if (!title || !message || state.key === "invalid") {
      return;
    }

    title.textContent = state.title;
    message.textContent = state.message;
    section.dataset.nidaEarlyWindowState = state.key;

    if (state.active && countdown) {
      countdown.hidden = false;
      countdown.textContent = formatCountdown(state.end, Date.now());
    } else if (countdown) {
      countdown.hidden = true;
      countdown.textContent = "";
    }

    if (benefit) {
      benefit.hidden = !state.active;
    }
  }

  function init() {
    var section = document.querySelector("[data-nida-launch]");
    if (!section) {
      return;
    }

    updateLaunch(section);
    window.setInterval(function () {
      updateLaunch(section);
    }, MINUTE_MS);
  }

  root.ERESNidaLaunch = {
    getEarlyWindowState: getEarlyWindowState,
    formatCountdown: formatCountdown,
    getCapacityState: getCapacityState,
    updateLaunch: updateLaunch
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : globalThis);
