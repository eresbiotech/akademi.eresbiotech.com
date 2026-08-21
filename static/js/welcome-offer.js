(function () {
  var storageKey = "eresWelcomeOfferViews";
  var offer = document.querySelector("[data-welcome-offer]");

  if (!offer) return;

  var views = 0;
  try {
    views = parseInt(localStorage.getItem(storageKey), 10) || 0;
  } catch (error) {
    return;
  }

  if (views >= 2) return;

  function closeOffer() {
    offer.hidden = true;
  }

  function showOffer() {
    offer.hidden = false;
    localStorage.setItem(storageKey, String(views + 1));
  }

  var closeButton = offer.querySelector("[data-welcome-offer-close]");
  if (closeButton) closeButton.addEventListener("click", closeOffer);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !offer.hidden) closeOffer();
  });

  window.setTimeout(showOffer, views === 0 ? 7000 : 10000);
}());
