(function () {

  window.initBlackhole = () => {

    let page404 = document.querySelector(`.page-404`);
    if (!page404) {
      return;
    }
    let btn = page404.querySelector(`.page-404__btn`);
    let blackHole = page404.querySelector(`.page-404__collapsar svg`);

    let blackHoleBlock = page404.querySelector(`.page-404__collapsar`);

    const w = screen.width;
    const defaultSize = 52;

    function getCoords(top, height) {
      let centerH = Math.round(height / 2);
      let curve = centerH - top;
      let h = curve * 2 + height;
      let number = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

      return number;
    }

    function btnAnimation(startOp, endOp, startPos, endPos, bool, cursor) {
      let animation = btn.animate([
        {
          top: startPos + `%`,
          opacity: startOp,
        }, {
          top: endPos + `%`,
          opacity: endOp,
        }
      ], {
        duration: 300,
        fill: `forwards`
      });

      animation.addEventListener(`finish`, function () {
        btn.style = `top: ` + endPos + `%; opacity: ` + endOp + `; cursor: ` + cursor;
        btn.disabled = bool;
      });
    }

    function holeExpand(size) {
      let animation = blackHole.animate([
        {
          width: defaultSize + `px`,
          height: defaultSize + `px`
        }, {
          width: size + `px`,
          height: size + `px`
        }
      ], {
        duration: 20000,
        fill: `forwards`
      });

      animation.addEventListener(`finish`, function () {
        blackHole.style = `width: ` + size + `px; height: ` + size + `px;`;
        let cursor = `pointer`;
        btnAnimation(0, 1, 90, 50, false, cursor);
      });
    }

    function holeCollapse(size) {
      let animation = blackHole.animate([
        {
          width: size + `px`,
          height: size + `px`
        }, {
          width: defaultSize + `px`,
          height: defaultSize + `px`
        }
      ], {
        duration: 500,
        fill: `forwards`
      });

      animation.addEventListener(`finish`, function () {
        blackHole.style = `width: ` + defaultSize + `px; height: ` + defaultSize + `px;`;
      });
    }

    if (window.matchMedia(`(max-width: 767px)`).matches) {
      let topBlackHole = blackHole.getBoundingClientRect().top;
      let hMobile = page404.offsetHeight;
      let hypotenuse = getCoords(topBlackHole, hMobile);

      setTimeout(() => {
        holeExpand(hypotenuse);
      }, 5000);

      btn.addEventListener(`click`, function () {
        let cursor = `default`;
        btnAnimation(1, 0, 50, 90, true, cursor);

        setTimeout(() => {
          holeCollapse(hypotenuse);
        }, 500);

        setTimeout(() => {
          holeExpand(hypotenuse);
        }, 3000);
      });
    } else {
      let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName(`body`)[0].clientHeight;
      let topBlackHole = blackHoleBlock.getBoundingClientRect().top;
      let hypotenuse = getCoords(topBlackHole, screenHeight);

      setTimeout(() => {
        holeExpand(hypotenuse);
      }, 5000);

      btn.addEventListener(`click`, function () {
        let cursor = `default`;
        btnAnimation(1, 0, 50, 90, true, cursor);

        setTimeout(() => {
          holeCollapse(hypotenuse);
        }, 300);

        setTimeout(() => {
          holeExpand(hypotenuse);
        }, 3000);
      });
    }
  };
})();
