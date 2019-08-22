(function () {
  let mySwiper;
  let headlinerSection;

  window.initHeadlinerSlider = () => {
    if (headlinerSection) {
      return;
    }

    headlinerSection = document.querySelector(`.headliners`);

    if (!headlinerSection) {
      return;
    }
    let slider = headlinerSection.querySelector(`.swiper-container`);

    if (mySwiper) {
      mySwiper.destroy(true, true);
    }

    mySwiper = new window.Swiper(slider, {
      slidesPerView: `auto`,
      centeredSlides: true,
      loop: true,
      nextButton: `.headliners__button--next`,
      prevButton: `.headliners__button--prev`,
      observer: true,
      observeParents: true,

      breakpoints: {
        1200: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        767: {
          slidesPerView: `auto`,
          spaceBetween: 16,
          loop: false
        },

        374: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: false
        },
      }
    });
  };
})();
