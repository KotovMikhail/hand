(() => {
  document.addEventListener(`mouseenter`, (evt) => {
    if (evt.target.classList) {
      let button = evt.target;

      if (button.classList.contains(`main__link`)) {
        let sibling = button.nextElementSibling;

        if (!sibling || !sibling.classList || !sibling.classList.contains(`main__link`)) {
          sibling = button.previousElementSibling;

          if (!sibling || !sibling.classList || !sibling.classList.contains(`main__link`)) {
            sibling = null;
          }
        }

        if (sibling) {
          window.setTimeout(() => {
            sibling.classList.add(`rotated`);
          }, 150);

          button.addEventListener(`mouseleave`, () => {
            window.setTimeout(() => {
              sibling.classList.remove(`rotated`);
            }, 100);
          });
        }
      } else {
        let rotatedBtn = document.querySelector(`.rotated`);

        if (rotatedBtn) {
          rotatedBtn.classList.remove(`rotated`);
        }
      }
    }
  }, true);
})();
