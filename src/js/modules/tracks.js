(function () {
  let tracksSection;

  window.initTracks = () => {
    if (tracksSection) {
      return;
    }

    tracksSection = document.querySelector(`.tracks`);

    if (!tracksSection) {
      return;
    }

    let classNames = [`tracks--pink`, `tracks--yellow`, `tracks--violet`, `tracks--blue`];
    let trackTabs = tracksSection.querySelectorAll(`.tracks__tab`);
    let trackTabBlocks = tracksSection.querySelectorAll(`.tracks__tab-block`);
    let btnAdd = tracksSection.querySelector(`.tracks__btn`);
    let btnsContainer = tracksSection.querySelector(`.container`);
    let tracksContainer = tracksSection.querySelector(`.tracks__container`);
    let trackTabsBlock = tracksSection.querySelector(`.tracks__switch__btns`);
    let headerNav = document.querySelector(`.main-nav`);
    let header = document.querySelector(`.header`);
    let fullBlock = document.querySelector(`.page-full`);
    // Клик на "Показать еще"
    function onBtnAddClick(e) {
      let container = tracksContainer.cloneNode(true);
      tracksSection.insertBefore(container, e.target);

    }
    // Функция изменения таб-блоков с текстом
    function changeTabBlock(e) {
      [].forEach.call(trackTabBlocks, function (block) {
        block.getAttribute(`data-tab`) === e.target.getAttribute(`data-tab`)
          ? block.classList.add(`tracks__tab-block--opened`)
          : block.classList.remove(`tracks__tab-block--opened`);
      });
    }
    // Функция смены цветов трек-блоков
    function changeTabsColor(e) {
      for (let i = 0; i < trackTabs.length; i++) {
        tracksSection.classList.remove(classNames[i]);

        if (trackTabs[i] === e.target) {
          trackTabs[i].classList.add(`tracks__tab--active`);
          tracksSection.classList.add(classNames[e.target.getAttribute(`data-tab`) - 1]);
        } else {
          trackTabs[i].classList.remove(`tracks__tab--active`);
        }
      }
    }
    // Функция нажатия на табы моб.версии
    function onBtnsMobileClick(e) {
      let btnMobile = tracksSection.querySelector(`.tracks__switch__btns > button`);
      let hiddenBlock = tracksSection.querySelector(`.tracks__list`);

      if (hiddenBlock.classList.contains(`opened`)) {
        hiddenBlock.classList.add(`fade-in`);
        hiddenBlock.classList.remove(`fade-out`);

        hiddenBlock.append(btnMobile);
        btnMobile.classList.remove(`tracks__tab--mobile`);
        trackTabsBlock.prepend(e.target);
        e.target.classList.add(`tracks__tab--mobile`);
        changeTabsColor(e);

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

      changeTabBlock(e);
    }
    // Функция нажатия на табы десктоп.версии
    function onBtnsDesktopClick(e) {
      changeTabsColor(e);
      changeTabBlock(e);
    }

    // ОБРАБОТЧИКИ СОБЫТИЙ
    btnAdd.addEventListener(`click`, onBtnAddClick);

    let screenHeight = document.documentElement.clientHeight;
    let topSectionMob = trackTabsBlock.getBoundingClientRect().top - screenHeight;

    window.addEventListener(`resize`, () => {
      let hiddenBlock = tracksSection.querySelector(`.tracks__list`);
      hiddenBlock.classList.remove(`fade-in`);
      screenHeight = document.documentElement.clientHeight;
      topSectionMob = trackTabsBlock.getBoundingClientRect().top - screenHeight;
    });

    fullBlock.addEventListener(`scroll`, function () {
      let topSection = tracksContainer.offsetTop;
      let scrollTop = fullBlock.pageYOffset || fullBlock.scrollTop;
      let bottomSection = tracksSection.offsetTop + tracksSection.offsetHeight;

      if (window.matchMedia(`(max-width: 767px)`).matches) {
        if (scrollTop >= (topSectionMob) && scrollTop <= bottomSection) {
          trackTabsBlock.classList.add(`fixed`);
          tracksSection.prepend(trackTabsBlock);
          tracksSection.style.position = `relative`;
          header.classList.add(`hiddenTrack`);
          headerNav.classList.add(`hiddenTrack`);
        } else {
          btnsContainer.append(trackTabsBlock);
          tracksSection.style = `none`;
          trackTabsBlock.classList.remove(`fixed`);
          header.classList.remove(`hiddenTrack`);
          headerNav.classList.remove(`hiddenTrack`);
        }
      } else {
        if (scrollTop >= (topSection) && scrollTop <= bottomSection) {
          trackTabsBlock.classList.add(`fixed`);
          header.classList.add(`hiddenTrack`);
          headerNav.classList.add(`hiddenTrack`);
        } else {
          trackTabsBlock.classList.remove(`fixed`);
          header.classList.remove(`hiddenTrack`);
          headerNav.classList.remove(`hiddenTrack`);
        }
      }
    }, {
      passive: true
    });

    [].forEach.call(trackTabs, function (it) {
      it.addEventListener(`click`, (evt) => {
        if (window.matchMedia(`(max-width: 767px)`).matches) {
          onBtnsMobileClick(evt);
        } else {
          onBtnsDesktopClick(evt);
        }
      });
    });
  };
})();
