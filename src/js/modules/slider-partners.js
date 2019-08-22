(function () {
  let swipers;
  let listeners;

  window.initPartnersSlider = () => {
    swipers = document.querySelectorAll(`.partners`);

    if (!swipers.length) {
      return;
    }

    for (let i = 0; i < swipers.length; i++) {
      const element = swipers[i];
      let swiper = element.querySelector(`.swiper-container`);
      let prevBtn = element.querySelector(`.swiper-button-prev`).classList.add(`swiper-button-prev` + i);
      let nextBtn = element.querySelector(`.swiper-button-next`).classList.add(`swiper-button-next` + i);

      var mySwiper = new Swiper(swiper, {
        slidesPerView: 3,
        nextButton: `.swiper-button-next` + i,
        prevButton: `.swiper-button-prev` + i,
        observer: true,
        observeParents: true,
        breakpoints: {
          767: {
            slidesPerView: 1,
            spaceBetween: 16,
            nextButton: `.swiper-button-next` + i,
            prevButton: `.swiper-button-prev` + i,
            loop: false,
            observer: true,
            observeParents: true,
          },
        }
      });
    }

    if (listeners) {
      return;
    }

    let switchBtnsBlock = document.querySelector(`.switch-btns`);
    if (!switchBtnsBlock) {
      return;
    }
    let btns = switchBtnsBlock.querySelectorAll(`.switch-btns__btn-select`);
    let hiddenBlock = switchBtnsBlock.querySelector(`.switch-btns__hidden-block`);

    // клик на выпадающее меню
    [].forEach.call(btns, function (btn) {
      btn.addEventListener(`click`, function (e) {
        let btnMobile = document.querySelector(`.switch-btns > button`);

        if (hiddenBlock.classList.contains(`opened`)) {
          hiddenBlock.classList.add(`fade-in`);
          hiddenBlock.classList.remove(`fade-out`);

          hiddenBlock.append(btnMobile);
          switchBtnsBlock.prepend(this);


          setTimeout(() => {
            hiddenBlock.classList.remove(`opened`);
          }, 300);
        } else {
          hiddenBlock.classList.add(`opened`);
          hiddenBlock.classList.add(`fade-out`);

          setTimeout(() => {
            hiddenBlock.classList.remove(`fade-in`);

          }, 100);
        }

        [].forEach.call(swipers, function (it) {
          e.target.getAttribute(`data-btn-select`) === it.getAttribute(`data-btn-select`)
            ? it.classList.add(`partners--show`)
            : it.classList.remove(`partners--show`);
        });
      });
    });

    listeners = true;
  };
})();
