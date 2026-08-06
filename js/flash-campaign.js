(function () {
  "use strict";

  var SECOND_MS = 1000;

  function formatRemaining(milliseconds) {
    var totalSeconds = Math.max(0, Math.floor(milliseconds / SECOND_MS));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    return [hours, minutes, seconds].map(function (value) {
      return String(value).padStart(2, "0");
    }).join(":");
  }

  function setEndedState(section) {
    section.dataset.flashCampaignState = "ended";
    var ended = section.querySelector("[data-flash-ended]");
    var countdown = section.querySelector("[data-flash-countdown]");

    if (ended) {
      ended.hidden = false;
    }
    if (countdown) {
      countdown.textContent = "00:00:00";
    }

    section.querySelectorAll("[data-flash-checkout]").forEach(function (checkout) {
      checkout.removeAttribute("href");
      checkout.setAttribute("aria-disabled", "true");
      checkout.setAttribute("tabindex", "-1");
    });
  }

  function init() {
    var section = document.querySelector("[data-flash-campaign]");
    if (!section) {
      return;
    }

    section.querySelector(".flash-campaign-badge").textContent = "YALNIZCA BU GECE";
    section.querySelector("#flash-campaign-title").innerHTML = "3 BİYOİNFORMATİK PROGRAMI <span>%60 NATURALOGIC DESTEĞİYLE</span>";
    section.querySelector(".flash-campaign-lead").textContent = "Ödemenizi tamamladığınız anda üç programa erişebilir ve derslere hemen başlayabilirsiniz. Pakete NaturaLogic Anadolu Doğa Atlası’ndan özel uygulamalar da dahildir.";
    section.querySelector(".flash-price-card .flash-audience").textContent = "Öğrenciler İçin";
    section.querySelector(".flash-price-card .flash-checkout").textContent = "ÖĞRENCİ KAYDINI TAMAMLA";
    section.querySelector(".flash-price-card-professional .flash-audience").textContent = "Çalışanlar ve Profesyoneller İçin";
    section.querySelector(".flash-price-card-professional .flash-checkout").textContent = "PROFESYONEL KAYDINI TAMAMLA";

    var end = new Date(section.dataset.endsAt).getTime();
    var countdown = section.querySelector("[data-flash-countdown]");
    if (!Number.isFinite(end)) {
      return;
    }

    function update() {
      var remaining = end - Date.now();
      if (remaining <= 0) {
        setEndedState(section);
        return true;
      }
      if (countdown) {
        countdown.textContent = formatRemaining(remaining);
      }
      return false;
    }

    if (update()) {
      return;
    }

    var timer = window.setInterval(function () {
      if (update()) {
        window.clearInterval(timer);
      }
    }, SECOND_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
