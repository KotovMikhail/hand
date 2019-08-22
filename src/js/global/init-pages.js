(() => {
  window.addEventListener(`load`, () => {
    document.querySelector(`main`).classList.add(`loaded`);

    let loader = document.querySelector(`.loader`);

    if (loader) {
      window.setTimeout(() => {
        loader.classList.add(`hiding`);
      }, 600);

      window.setTimeout(() => {
        document.body.classList.add(`animated`);
      }, 1300);

      window.setTimeout(() => {
        loader.classList.remove(`hiding`);
        loader.classList.add(`hidden`);
      }, 2000);

      window.setTimeout(() => {
        document.body.classList.remove(`animated`);
      }, 4000);
    }
  });

  window.initPages = () => {
    let mainPage = document.querySelector(`.main`);
    let short = document.querySelector(`.page-short`);
    let about = document.querySelector(`.about-short`);
    let notFound = document.querySelector(`.page-404`);

    if (mainPage) {
      document.body.classList.add(`is-main`);
    }

    if (short) {
      document.body.classList.add(`has-short`);
    }

    if (about) {
      document.body.classList.add(`is-about`);
    }

    if (notFound) {
      document.body.classList.add(`is-404`);
    }
  };
})();
