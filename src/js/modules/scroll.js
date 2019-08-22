(() => {
  let page;
  let short;
  let full;

  let nav;
  let popup;

  let startY;
  let startX;
  let endY;
  let endX;
  let delta;

  let prevScroll;

  const isMobile = () => window.matchMedia(`(max-width: 767px)`).matches;

  const unify = (evt) => evt.changedTouches ? evt.changedTouches[0] : evt;

  const showFull = () => {
    if (document.body.classList.contains(`is-about`)) {
      page.style.marginTop = ``;
    } else {
      page.style.marginTop = `-${window.innerHeight}px`;
    }

    window.setTimeout(() => {
      full.focus();
    }, 600);
  };

  const resizeSections = () => {
    if (document.body.classList.contains(`has-short`)) {
      if (isMobile()) {
        short.style.height = ``;
        full.style.height = ``;

        if (document.body.classList.contains(`is-main`)) {
          short.style.height = `${window.innerHeight}px`;
        }
      } else {
        short.style.height = `${window.innerHeight}px`;
        full.style.height = `${window.innerHeight}px`;
        document.body.classList.remove(`full-shown`);
      }
    }
  };

  const scroll = (shift) => {
    let menuOpened = document.body.classList.contains(`menu-opened`);

    if (isMobile()) {
      document.body.classList.remove(`full-shown`);
    } else {
      if (short && !menuOpened) {
        if (shift > 0) {
          if (!document.body.classList.contains(`full-shown`)) {
            showFull();
            document.body.classList.add(`full-shown`);
          }
        } else if (shift < 0) {
          if (full.scrollTop === 0 && document.body.classList.contains(`full-shown`)) {
            document.body.classList.remove(`full-shown`);
            page.style.marginTop = ``;
            full.blur();
          }
        }
      }
    }
  };

  const scrollToFull = () => {
    let shift = short.getBoundingClientRect().height / 20;
    let interval = window.setInterval(() => {

      if (full.getBoundingClientRect().top > 0) {
        page.scrollBy({
          top: shift
        });
      } else {
        window.clearInterval(interval);
      }
    }, 20);
  };

  window.initScroll = () => {
    page = document.querySelector(`main`);
    short = document.querySelector(`.page-short`);
    full = document.querySelector(`.page-full`);

    nav = document.querySelector(`.main-nav`);
    popup = document.querySelector(`.popup-container`);
    prevScroll = null;

    resizeSections();

    if (nav) {
      nav.addEventListener(`scroll`, (evt) => {
        evt.stopPropagation();
      });
    }

    if (popup) {
      popup.addEventListener(`scroll`, (evt) => {
        evt.stopPropagation();
      });
    }

    if (full) {
      full.addEventListener(`scroll`, () => {
        prevScroll = prevScroll || full.scrollTop;
        delta = full.scrollTop - prevScroll;
        prevScroll = full.scrollTop;

        if (delta < 0) {
          scroll(delta);
        }
      });
    }
  };

  window.addEventListener(`resize`, () => {
    resizeSections();
  });

  window.addEventListener(`wheel`, (evt) => {
    delta = evt.deltaY || evt.detail;
    scroll(delta);
  }, {
    passive: true
  });

  window.addEventListener(`touchstart`, (evt) => {
    startX = unify(evt).clientX;
    startY = unify(evt).clientY;
  });

  window.addEventListener(`touchmove`, (evt) => {
    endX = unify(evt).clientX;
    endY = unify(evt).clientY;

    if (document.body.classList.contains(`is-about`)) {
      delta = startX - endX;
    } else {
      delta = startY - endY;
    }
  }, {
    passive: false
  });

  window.addEventListener(`touchend`, () => {
    scroll(delta);
  });

  window.addEventListener(`click`, (evt) => {
    if (short && evt.target.hash === `#more`) {
      if (isMobile()) {
        window.setTimeout(() => {
          scrollToFull();
        }, 100);

        window.setTimeout(() => {
          evt.target.blur();
        }, 600);
      } else {
        scroll(100);
      }
      evt.preventDefault();
    }
  });

  document.addEventListener(`keyup`, (evt) => {
    if (!document.body.classList.contains(`menu-opened`) &&
      document.body.classList.contains(`full-shown`) &&
      full.scrollTop === 0) {
      if (document.body.classList.contains(`is-about`)) {
        if (evt.key === `ArrowLeft`) {
          scroll(-100);
        }
      } else if (evt.key === `ArrowUp`) {
        scroll(-100);
      }
    }
  });

})();
