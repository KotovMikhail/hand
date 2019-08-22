(function () {
  let programSection;

  window.initProgram = () => {
    if (programSection) {
      return;
    }

    programSection = document.querySelector(`.program`);

    if (!programSection) {
      return;
    }

    let btns = programSection.querySelectorAll(`.program__table div:first-child button`);
    let infoTags = programSection.querySelectorAll(`.tag.tag--info`);
    let days = programSection.querySelectorAll(`.program__date`);
    let tables = programSection.querySelectorAll(`.program__table`);

    [].forEach.call(tables, function (it) {
      if (it.getAttribute(`data-program-tab`) === 2) {
        it.classList.add(`closed`);
      }
    });

    // Клик на кнопки навигации моб.версии
    function onBtnsMobileClick(e) {
      [].forEach.call(tables, function (table) {
        if (table.getAttribute(`data-program-tab`) === e.target.getAttribute(`data-program-tab`)) {
          let btnMobile = table.querySelector(`.program__table > div > button`);
          let row1 = table.querySelector(`.program__table > div`);
          let hiddenBlock = table.querySelector(`.program__hidden-block`);
          let cols = table.querySelectorAll(`.program__table div:not(:first-of-type) .program__col:not(.program__col--button)`);

          if (hiddenBlock.classList.contains(`opened`)) {
            hiddenBlock.classList.add(`fade-in`);
            hiddenBlock.classList.remove(`fade-out`);

            hiddenBlock.append(btnMobile);
            row1.prepend(e.target);

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


          [].forEach.call(cols, function (col) {
            col.getAttribute(`data-col`) === e.target.getAttribute(`data-col`)
              ? col.classList.remove(`visually-hidden`)
              : col.classList.add(`visually-hidden`);
          });
        }
      });
    }
    // Клик на кнопки навигации десктоп.версии
    function onBtnsDesktopClick(e) {
      [].forEach.call(tables, function (table) {
        if (table.getAttribute(`data-program-tab`) === e.target.getAttribute(`data-program-tab`)) {
          let cols = table.querySelectorAll(`.program__col:not(.program__col--time):not(.program__col--button)`);
          let btnsNav = table.querySelectorAll(`.program__table div:first-child button`);
          [].forEach.call(cols, function (it) {
            it.getAttribute(`data-col`) === e.target.getAttribute(`data-col`)
              ? it.classList.remove(`inactive`)
              : it.classList.add(`inactive`);
          });

          [].forEach.call(btnsNav, function (it) {
            it === e.target
              ? it.parentElement.classList.add(`active`)
              : it.parentElement.classList.remove(`active`);
          });
        }
      });
    }
    // Клик на тег "инфо"
    function onInfoClick(e) {
      [].forEach.call(infoTags, function (it) {
        if (it === e.currentTarget) {
          it.parentElement.classList.toggle(`program__info--opened`);
          it.classList.toggle(`active`);
        }
      });
    }
    // Клик на дату (смена таблиц)
    function onDateClick(e) {
      [].forEach.call(days, function (it) {
        it === e.target
          ? it.classList.add(`program__date--active`)
          : it.classList.remove(`program__date--active`);
      });

      [].forEach.call(tables, function (it) {
        it.getAttribute(`data-program-tab`) === e.target.getAttribute(`data-program-tab`)
          ? it.classList.remove(`closed`)
          : it.classList.add(`closed`);
      });
    }
    // Клик на документ (закрытие инфо-тегов)
    function onDocumentClick(e) {
      [].forEach.call(infoTags, function (it) {
        if (it !== e.target) {
          it.parentElement.classList.remove(`program__info--opened`);
          it.classList.remove(`active`);
        }
      });
    }

    // ОБРАБОТЧИКИ СОБЫТИЙ
    if (window.matchMedia(`(max-width: 767px)`).matches) {
      let tableCols = programSection.querySelectorAll(`.program__table div:not(:first-of-type) .program__col:not(:nth-of-type(2)):not(.program__col--button)`);
      [].forEach.call(tableCols, function (col) {
        col.classList.add(`visually-hidden`);
      });

      [].forEach.call(btns, function (it) {
        it.addEventListener(`click`, onBtnsMobileClick);
      });
    } else {
      [].forEach.call(btns, function (it) {
        it.addEventListener(`click`, onBtnsDesktopClick);
      });
    }
    [].forEach.call(infoTags, function (it) {
      it.addEventListener(`click`, onInfoClick);
    });
    [].forEach.call(days, function (it) {
      it.addEventListener(`click`, onDateClick);
    });

    window.addEventListener(`click`, onDocumentClick);

    let header = document.querySelector(`.header`);
    let headerNav = document.querySelector(`.main-nav`);
    let fullBlock = document.querySelector(`.page-full`);

    fullBlock.addEventListener(`scroll`, function () {
      [].forEach.call(tables, function (table) {

        if (!table.classList.contains(`closed`)) {
          let row1 = table.querySelector(`.program__table > div`);
          let topSection = table.offsetTop;
          let bottomSection = table.offsetTop + table.offsetHeight;
          let scrollTop = fullBlock.pageYOffset || fullBlock.scrollTop;

          if (scrollTop >= (topSection) && scrollTop <= bottomSection) {
            row1.classList.add(`fixed`);
            header.classList.add(`hiddenProgram`);
            headerNav.classList.add(`hiddenProgram`);
          } else {
            row1.classList.remove(`fixed`);
            header.classList.remove(`hiddenProgram`);
            headerNav.classList.remove(`hiddenProgram`);
          }
        }
      });

    }, {
        passive: true
      });
  };
})();
