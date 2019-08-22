(() => {
  let parser = new window.DOMParser();
  window.currentPage = location.href;
  window.history.replaceState({
    pageName: window.currentPage,
    popup: false
  }, ``, window.currentPage);

  let pages = {};

  const runJS = () => {
    window.Sharer.init();
    window.initPages();
    window.initMenu();
    window.initNavBullet();
    window.initScroll();
    window.initPartnersSlider();
    window.initTracks();
    window.initHeadlinerSlider();
    window.initProgram();
    window.initPopup();
    window.initBuyings();
    window.initValidation();
    window.initBlackhole();
  };

  window.addEventListener(`load`, runJS);

  const loadHTML = (pageName, callback) => {
    if (pages[pageName]) {
      callback(pageName, ``);
      return;
    }

    let xhr = new XMLHttpRequest();

    xhr.overrideMimeType(`application/json`);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        callback(pageName, xhr.responseText);
      }

      if (xhr.status === 404) {
        loadHTML(`404`, callback);
      }
    });

    xhr.open(`GET`, pageName, true);
    xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`);
    xhr.send();
  };

  const replaceHTML = (pageName, htmlResponse) => {
    if (!htmlResponse && !pages[pageName]) {
      return;
    }

    let oldPage = document.documentElement;
    let oldHead = document.querySelector(`head`);
    let oldBody = document.querySelector(`body`);
    let oldLoader = document.querySelector(`.loader`);

    window.setTimeout(() => {
      oldBody.classList.add(`old`);
      oldLoader.classList.add(`hidden`);
      oldLoader.classList.add(`moving-in`);
    }, 100);

    window.setTimeout(() => {
      if (htmlResponse) {
        let newPage = parser.parseFromString(htmlResponse, `text/html`);
        let newHead = newPage.querySelector(`head`);
        let newBody = newPage.querySelector(`body`);

        document.documentElement.appendChild(newHead);

        let bodyEl = document.createElement(`body`);
        bodyEl.style.display = `none`;
        bodyEl.innerHTML = newBody.innerHTML;

        document.documentElement.appendChild(bodyEl);
      } else {
        document.documentElement.appendChild(pages[pageName].head);
        document.documentElement.appendChild(pages[pageName].body);
      }

      let body = document.querySelector(`body:nth-of-type(2)`);
      let main = body.querySelector(`main`);
      let loader = body.querySelector(`.loader`);

      main.style = ``;
      main.classList = ``;
      main.classList.add(`loaded`);
      loader.classList.add(`hidden`);
      loader.classList.add(`moving-in`);
      body.style.display = ``;
      body.classList.remove(`full-shown`);
      body.classList.remove(`menu-opened`);

      window.setTimeout(() => {
        oldLoader.classList.remove(`moving-in`);
        oldBody.classList.remove(`old`);

        pages[window.currentPage] = {
          head: oldPage.removeChild(oldHead),
          body: oldPage.removeChild(oldBody)
        };

        window.currentPage = pageName;
        runJS();
        window.scrollTo(0, 0);

        loader.classList.remove(`moving-in`);
        loader.classList.add(`moving-out`);
        document.body.classList.add(`animated`);
      }, 700);

      window.setTimeout(() => {
        loader.classList.remove(`moving-out`);
      }, 1300);

      window.setTimeout(() => {
        document.body.classList.remove(`animated`);
      }, 4000);
    }, 300);
  };

  const setPopup = (popupName, htmlResponse) => {
    if (htmlResponse) {
      let popup = parser.parseFromString(htmlResponse, `text/html`);
      let popupContent = popup.querySelector(`.popup`);
      let popupWindow = document.querySelector(`.popup-container`);

      if (popupWindow && popupContent) {
        let popupWindowContent = popupWindow.querySelector(`.popup`);

        if (popupWindowContent) {
          popupWindow.removeChild(popupWindowContent);
        }

        popupWindowContent = document.createElement(`div`);
        popupWindowContent.classList.add(`popup`);
        popupWindowContent.innerHTML = popupContent.innerHTML;

        popupWindow.appendChild(popupWindowContent);
        popupWindow.classList.remove(`closed`);
      }
    }
  };

  document.addEventListener(`click`, (evt) => {
    let link = evt.target;
    let status = window.getLinkStatus(link);
    let pageName = link.href;

    if (status) {
      if (status === `external`) {
        return;
      }

      evt.preventDefault();

      if (status === `popup`) {
        loadHTML(pageName, setPopup);
        window.history.replaceState({
          pageName,
          popup: true
        }, ``, pageName);
      } else if (status === `page` && pageName !== window.currentPage) {
        loadHTML(pageName, replaceHTML);
        window.history.pushState({
          pageName,
          popup: false
        }, ``, pageName);
      }
    }
  }, true);

  window.addEventListener(`popstate`, (evt) => {
    if (evt.state && evt.state.pageName) {
      if (evt.state.popup) {
        loadHTML(evt.state.pageName, setPopup);
      } else {
        loadHTML(evt.state.pageName, replaceHTML);
      }

      document.body.classList.remove(`menu-opened`);
    }
  });
})();
