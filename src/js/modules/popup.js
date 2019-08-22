(function () {
  let popupContainer;

  window.initPopup = () => {
    popupContainer = document.querySelector(`.popup-container`);

    if (!popupContainer) {
      return;
    }
  };

  const closePopup = () => {
    popupContainer.classList.add(`closed`);
    document.body.classList.remove(`popup-shown`);

    window.history.replaceState({
      pageName: window.currentPage,
      popup: false
    }, ``, window.currentPage);
  };

  document.addEventListener(`click`, (evt) => {
    if (evt.target.hasAttribute(`href`) && evt.target.hasAttribute(`data-popup`)) {
      window.setTimeout(() => {
        document.body.classList.add(`popup-shown`);
        popupContainer.style.height = window.innerHeight + `px`;
      }, 100);
    } else if (evt.target.classList.contains(`popup-container__close`)) {
      closePopup();
    }
  }, true);

  document.addEventListener(`keyup`, (evt) => {
    if (evt.key === `Escape`) {
      closePopup();
    }
  });
})();
