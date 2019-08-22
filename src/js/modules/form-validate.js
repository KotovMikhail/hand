(() => {
  let form;

  window.initValidation = () => {
    form = document.querySelector(`.form`);

    if (!form) {
      return;
    }

    const formFocus = () => {
      let input = form.querySelectorAll(`input, select, textarea`)[0];

      input.focus();
    };

    const sendFormData = (onload, data) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === 200) {
          onload(xhr.response);
        }
      });

      xhr.open(`POST`, form.action);
      xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`);
      xhr.send(data);
    };

    const onFormSent = (data) => {
      if (data.success) {
        form.classList.add(`success`);

        if (form.offsetTop < window.getScrollTop()) {
          form.scrollIntoView({
            behavior: `smooth`
          });
        }
      } else {
        let formFields = form.querySelectorAll(`.form__item`);

        for (let field of formFields) {
          let input = field.querySelector(`input, textarea, select`);

          if (data.data[input.name]) {
            let errorElement = field.querySelector(`.error-message`);
            field.classList.add(`error`);
            input.classList.add(`error-blur`);

            if (errorElement) {
              errorElement.textContent = data.data[input.name];
            }
          }
        }

        form.querySelectorAll(`.form .error input, .form .error select, .form .error textarea`)[0].focus();
      }
    };

    form.addEventListener(`invalid`, (evt) => {
      evt.preventDefault();

      let input = evt.target;
      let errorElement = input.parentElement.querySelector(`.error-message`);
      input.parentElement.classList.add(`error`);
      input.classList.add(`error-blur`);

      if (errorElement) {
        if (input.validity.valueMissing) {
          errorElement.textContent = `Это поле обязательно для заполнения`;
        } else if (input.type === `email` && (input.validity.typeMismatch || input.validity.patternMismatch)) {
          errorElement.textContent = `Проверьте введённый e-mail, кажется, там ошибка`;
        } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
          errorElement.textContent = `Неверный формат`;
        }
      }

      form.querySelectorAll(`.form :invalid`)[0].focus();
    }, true);

    form.addEventListener(`change`, function (evt) {
      let input = evt.target;

      if (input.validity.valid) {
        input.classList.remove(`error-blur`);
        input.parentElement.classList.remove(`error`);
      }
    }, true);

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      let formData = new FormData(form);
      sendFormData(onFormSent, formData);
    });

    form.addEventListener(`click`, (evt) => {
      if (evt.target.type === `button` &&
          evt.target.parentElement.classList.contains(`form__success`)) {
        form.reset();
        form.classList.remove(`success`);
        formFocus();
      }
    });


    // Авторесайз текстового поля
    let text = document.querySelector(`.form textarea`);
    let observe;

    if (window.attachEvent) {
      observe = function (element, event, handler) {
        element.attachEvent(`on` + event, handler);
      };
    } else {
      observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
      };
    }

    const initTextResize = function () {
      function resize() {
        text.style.height = `auto`;
        text.style.height = text.scrollHeight + `px`;
      }
      function delayedResize() {
        window.setTimeout(resize, 0);
      }
      observe(text, `change`, resize);
      observe(text, `cut`, delayedResize);
      observe(text, `paste`, delayedResize);
      observe(text, `drop`, delayedResize);
      observe(text, `keydown`, delayedResize);

      // text.focus();
      // text.select();
      resize();
    };
    if (text) {
      initTextResize();
    }
  };
})();
