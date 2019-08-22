(() => {
  const MENU_BTN_CLASS = `main-nav__btn`;
  const MENU_OPENED_CLASS = `menu-opened`;
  const MENU_ITEM_CLASS = `main-nav__link`;
  const CURRENT_MENU_ITEM_CLASS = `main-nav__link--current`;
  const DIRECTIONS = {
    ArrowUp: `top`,
    ArrowLeft: `left`,
    ArrowRight: `right`,
    ArrowDown: `bottom`
  };

  const MENU_DIRECTIONS = {
    ArrowUp: `top`,
    ArrowLeft: `left`,
    ArrowRight: `right`,
    ArrowDown: `center`
  };

  let currentLink;
  let nav;

  const changeCurrentItem = (newLink) => {
    let status = window.getLinkStatus(newLink);

    if (!status) {
      return;
    }

    if (status === `page`) {
      let shown = !!currentLink;

      if (currentLink && currentLink !== newLink) {
        currentLink.classList.remove(CURRENT_MENU_ITEM_CLASS);
        currentLink = null;
      }

      if (newLink.classList.contains(MENU_ITEM_CLASS)) {
        currentLink = newLink;
        currentLink.classList.add(CURRENT_MENU_ITEM_CLASS);

        if (!shown) {
          window.placeBullet(newLink);
        } else {
          window.moveBullet(newLink);
        }
      }
    }
  };

  window.initMenu = () => {
    nav = document.querySelector(`.main-nav`);

    if (nav) {
      let navLinks = nav.querySelectorAll(`.main-nav__link`);
      currentLink = nav.querySelector(`.${ CURRENT_MENU_ITEM_CLASS }`);
      let pageLink;

      for (let link of navLinks) {
        if (link.href === window.currentPage) {
          pageLink = link;
        }
      }

      if (pageLink) {
        changeCurrentItem(pageLink);
      }
    }
  };

  const onLinkHover = (evt) => {
    evt.target.parentElement.classList.add(`shown`);
  };

  document.addEventListener(`click`, (evt) => {
    let target = evt.target;

    if (target.classList.contains(MENU_BTN_CLASS)) {
      let links = nav.querySelectorAll(`.main-nav__link`);

      for (let link of links) {
        link.classList.remove(`shown`);
        let circle = link.querySelector(`.main-nav__circle`);

        if (circle) {
          circle.addEventListener(`animationend`, onLinkHover);
        }
      }

      document.body.classList.toggle(MENU_OPENED_CLASS);
    } else {
      changeCurrentItem(target);
    }
  }, true);

  document.addEventListener(`keydown`, (evt) => {
    let direction = DIRECTIONS[evt.key];

    if (direction && !document.body.classList.contains(`full-shown`)) {
      evt.preventDefault();
    }
  }, true);

  document.addEventListener(`keyup`, (evt) => {
    if (!document.body.classList.contains(MENU_OPENED_CLASS)) {
      if (!document.body.classList.contains(`full-shown`)) {
        let direction = DIRECTIONS[evt.key];
        let navButton = document.querySelector(`.nav-button--${ direction }`);

        if (navButton) {
          navButton.click();
        }
      }
    } else {
      let menuDirection = MENU_DIRECTIONS[evt.key];
      let menuItem = nav.querySelector(`.main-nav__item--${ menuDirection }`);
      let currentItem = currentLink.parentElement;

      if ((currentItem.classList.contains(`main-nav__item--left`) && evt.key === `ArrowRight`) ||
        (currentItem.classList.contains(`main-nav__item--right`) && evt.key === `ArrowLeft`)) {
        menuItem = nav.querySelector(`.main-nav__item--center`);
      }

      if (menuItem !== currentItem) {
        menuItem.querySelector(`.main-nav__link`).click();
      }
    }
  });
})();
