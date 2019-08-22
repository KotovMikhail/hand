(() => {
  const STATES = {
    mouse: `is-mouse`,
    key: `is-key`,
    touch: `is-touch`
  };

  document.addEventListener(`mousedown`, () => {
    document.body.classList.add(STATES.mouse);
    document.body.classList.remove(STATES.key);
  });

  document.addEventListener(`touchstart`, () => {
    document.body.classList.add(STATES.touch);
    document.body.classList.remove(STATES.mouse);

    window.isTouch = true;
  });

  document.addEventListener(`keydown`, () => {
    document.body.classList.add(STATES.key);
    document.body.classList.remove(STATES.mouse);
  });

  window.addEventListener(`resize`, () => {
    document.body.classList.remove(STATES.touch);
    document.body.classList.remove(STATES.key);

    window.isTouch = false;
  });
})();
