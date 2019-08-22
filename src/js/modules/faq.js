(function () {
  document.addEventListener(`click`, (evt) => {
    let btn;

    if (evt.target.classList.contains(`faq__question`)) {
      btn = evt.target;
    } else if (evt.target.parentElement.classList.contains(`faq__question`)) {
      btn = evt.target.parentElement;
    }

    if (btn) {
      let block = btn.parentElement;
      let answer = block.querySelector(`.faq__answer`);

      if (block.classList.contains(`faq__block--opened`)) {
        answer.classList.add(`fade-in`);
        answer.classList.remove(`fade-out`);

        setTimeout(() => {
          block.classList.remove(`faq__block--opened`);
        }, 300);
      } else {
        block.classList.add(`faq__block--opened`);
        answer.classList.add(`fade-out`);

        setTimeout(() => {
          answer.classList.remove(`fade-in`);

        }, 100);
      }
    }
  }, true);
})();
