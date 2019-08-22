(() => {
  let menu;
  let distance;
  let currentPosition;
  let centerItem;
  let topLink;

  let bullet = document.createElement(`div`);
  bullet.innerHTML = `<div></div>`;
  bullet.classList.add(`main-nav__bullet`);

  const TO_CENTER_SHIFT = {
    1: `bottom`,
    2: window.matchMedia(`(min-width: 768px)`).matches ? `right` : `left`,
    3: `left`
  };

  const TO_POSITION_SHIFT = {
    1: `top`,
    2: `marginLeft`,
    3: `marginLeft`
  };

  const calculateDistance = () => {
    if (window.matchMedia(`(min-width: 768px)`).matches) {
      distance = (centerItem.getBoundingClientRect().width + topLink.getBoundingClientRect().width) / 2 - 20;
    } else {
      distance = (centerItem.getBoundingClientRect().width + 64) / 2 - 10;
    }

    distance = Math.max(distance, 30);
  };

  window.initNavBullet = () => {
    menu = document.querySelector(`.main-nav`);

    if (!menu) {
      return;
    }

    let currentItem = menu.querySelector(`.main-nav__link--current`);
    centerItem = menu.querySelector(`.main-nav__item--center`);
    let topItem = menu.querySelector(`.main-nav__item--top`);
    topLink = topItem.querySelector(`a`);
    currentPosition = null;

    if (currentItem) {
      currentItem.appendChild(bullet);

      let parent = currentItem.parentElement;
      currentPosition = getDirection(parent);
    }
  };

  const getDirection = (parent) => {
    if (parent.classList.contains(`main-nav__item--top`)) {
      return 1;
    } else if (parent.classList.contains(`main-nav__item--left`)) {
      return 2;
    } else if (parent.classList.contains(`main-nav__item--right`)) {
      return 3;
    }
    return 0;
  };

  const moveToCenter = (direction, nextDirection, link) => {
    if (direction) {
      let sign = -1;

      if (window.matchMedia(`(max-width: 767px)`).matches && direction === 2) {
        sign = 1;
      }

      bullet.style[TO_CENTER_SHIFT[direction]] = (sign * distance) + `px`;

      window.setTimeout(() => {
        bullet.parentElement.removeChild(bullet);
        bullet.style = ``;
        centerItem.querySelector(`a`).appendChild(bullet);
      }, 200);

      window.setTimeout(() => {
        moveToPosition(nextDirection, link);
      }, 250);
    } else {
      moveToPosition(nextDirection, link);
    }
  };

  const moveToPosition = (direction, link) => {
    if (direction) {
      let sign = -1;

      if (direction === 3) {
        sign = 1;
      }

      bullet.style[TO_POSITION_SHIFT[direction]] = (sign * distance) + `px`;

      window.setTimeout(() => {
        bullet.parentElement.removeChild(bullet);
        bullet.style = ``;
        link.appendChild(bullet);
      }, 200);
    }
  };

  window.placeBullet = (parent) => {
    if (parent) {
      parent.appendChild(bullet);
    }
  };

  window.moveBullet = (link) => {
    calculateDistance();
    let newPosition = getDirection(link.parentElement);

    if (currentPosition !== newPosition) {
      moveToCenter(currentPosition, newPosition, link);
    }
  };
})();
