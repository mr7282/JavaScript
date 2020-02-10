"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} openedArrowRightClass Класс для правой стрелки
 * @property {string} openedArrowLeftClass Класс для левой стрелки
 * @property {string} arrowRightSrc Путь к картинке правой стрелки
 * @property {string} arrowLeftSrc Путь к картинке левой стрелки
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageNotFound: 'images/gallery/notFound.jpg',
    openedArrowRightClass: "arrowRightClass",
    openedArrowLeftClass: "arrowLeftClass",
    arrowRightSrc: "images/gallery/arrowRight.png",
    arrowLeftSrc: "images/gallery/arrowLeft.png",
  },

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }

    let img = new Image();
    img.onload = () => this.openImage(event.target.dataset.full_image_url);
    img.onerror = () => this.openImage(this.settings.openedImageNotFound);
    img.src = event.target.dataset.full_image_url;
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Возвращает массив всех картинок имеющихся на странице
   * @returns {array}
   */
  getArrayImage() {
    let arrayImage = [];
   document.querySelectorAll(".miniImg").forEach(miniImg => {
     arrayImage.push(miniImg.dataset.full_image_url);
   }) 
   return arrayImage;
  },

  /**
   * 
   */
  leafRight() {
    let arrayImage = this.getArrayImage();
    for (let index = 0; index < arrayImage.length; index++) {
      if (arrayImage[index] === document.querySelector(`.${this.settings.openedImageClass}`).src) {
        this.openImage(arrayImage[index+1]);
      }      
    }
  },

  leafLeft() {
    console.log("Всё ок! слево");
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    //Создаем Правую стрелку для переключения картинок, ставим класс, src и добавляем ее в контейнер-обертку.
    const arrowRightElement = new Image();
    arrowRightElement.classList.add(this.settings.openedArrowRightClass);
    arrowRightElement.src = this.settings.arrowRightSrc;
    arrowRightElement.addEventListener('click', () => this.leafRight());
    galleryWrapperElement.appendChild(arrowRightElement);

    //Создаем Левую стрелку для переключения картинок, ставим класс, src и добавляем ее в контейнер-обертку.
    const arrowLeftElement = new Image();
    arrowLeftElement.classList.add(this.settings.openedArrowLeftClass);
    arrowLeftElement.src = this.settings.arrowLeftSrc;
    arrowLeftElement.addEventListener('click', () => this.leafLeft());
    galleryWrapperElement.appendChild(arrowLeftElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    image.setAttribute(data-full_image_url);
    galleryWrapperElement.appendChild(image);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});