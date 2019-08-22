(function () {
  window.initBuyings = () => {

    let buyingSection = document.querySelector(`.buying`);
    let main = document.querySelector(`main`);

    if (!buyingSection) {
      return;
    }

    let table = buyingSection.querySelector(`.buying__table`);
    let tableBody = table.querySelector(`tbody`);
    let tableRows = table.querySelectorAll(`tr`);
    let tableCells = table.querySelectorAll(`td`);
    let tableRow1 = table.querySelector(`tr:first-of-type`);
    let columnHeads = tableRow1.querySelectorAll(`th`);
    let headerNav = document.querySelector(`.main-nav`);
    let header = document.querySelector(`.header`);

    window.addEventListener(`load`, function () {
      table.setAttribute(`role`, `grid`);
      tableBody.setAttribute(`role`, `rowgroup`);

      [].forEach.call(tableRows, function (tableRow) {
        tableRow.setAttribute(`role`, `row`);
      });

      [].forEach.call(columnHeads, function (columnHead) {
        columnHead.setAttribute(`role`, `rowheader gridcell`);
      });

      [].forEach.call(tableCells, function (tableCell) {
        tableCell.setAttribute(`role`, `gridcell`);
      });

    });

    if (window.matchMedia(`(min-width: 768px)`).matches) {
      main.addEventListener(`scroll`, function () {
        let topSection = table.offsetTop;
        let scrollTop = main.pageYOffset || main.scrollTop;
        if (scrollTop >= topSection) {
          tableRow1.classList.add(`fixed`);
          header.classList.add(`hiddenTrack`);
          headerNav.classList.add(`hiddenTrack`);
        } else {
          tableRow1.classList.remove(`fixed`);
          header.classList.remove(`hiddenTrack`);
          headerNav.classList.remove(`hiddenTrack`);
        }
      }, {
        passive: true
      });
    }
  };
})();
