"use strict";

/**
 * Объект заказа товаров
 * @property {object} settings настройки заказа товаров.
 * @property {number} countProduct счетчик количества помещенных в заказ товаров.
 * @property {number} countResult счетчик общей суммы товаров находящихся в заказе.
 * @property {object} elemCountProduct содержит id изменяемого <span> кол-ва товаров.
 * @property {object} elemCountResult содержит id изменяемого <span> суммы товаров.
 */
const order = {
  settings: {
    countProductBox: "countProduct",
    countPriceBox: "result",
    buyButton: "buy",
  },

  countProduct: 0,
  countResult: 0,
  elemCountProduct: null,
  elemCountResult: null,

  /**
   * Присваевывает свойствам order  HTML элементам <span>, сбрасывает значения счетчиков в ноль, отображает начальные значение.
   */
  init() {
    this.countProduct = 0;
    this.countResult = 0;
    this.elemCountProduct = document.getElementById(this.settings.countProductBox);
    this.elemCountResult = document.getElementById(this.settings.countPriceBox);
    this.addEventHandler();
    this.render();
  },

  /**
   * Присваевывает(отображает) в <span> показания счетчиков
   */
  render() {
    this.elemCountProduct.innerHTML = this.countProduct;
    this.elemCountResult.innerHTML = this.countResult;
  },

  /**
   * Присваевавает обработчик Click всем кнопкам Купить
   */
  addEventHandler() {
    document.querySelectorAll(".buy").forEach(button => {
      button.addEventListener("click", event => this.putInOrder(event));
    })
  },

  /**
   * Производит арефметические действия после возникновения события обработчика Click.
   */
  putInOrder(event) {
    this.countProduct++;
    this.countResult += +event.target.dataset.price
    this.render();
  },
}

//Инициализирует добавление товаров в Заказы
order.init();