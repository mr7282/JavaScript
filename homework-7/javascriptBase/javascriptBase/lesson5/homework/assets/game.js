"use strict";

/**
 * Объект с настройками игры.
 * @property {int} rowsCount - Количество строк в карте.
 * @property {int} colsCount - Количество колонок в карте.
 * @property {int} startPositionX - Начальная позиция игрока по X координате.
 * @property {int} startPositionY - Начальная позиция игрока по Y координате.
 * @property {string} startDirection - Начальное направление игрока.
 * @property {number} stepsInSecond - Шагов в секунду.
 * @property {string} playerCellColor - Цвет ячейки игрока.
 * @property {string} emptyCellColor - Цвет пустой ячейки.
 */
const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionX: 0,
  startPositionY: 0,
  startDirection: 'right',
  stepsInSecond: 5,
  playerCellColor: '#AA3333',
  emptyCellColor: '#EEEEEE',
};

/**
 * Объект игрока, здесь будут все методы и свойства связанные с ним непосредственно.
 * @property {int} x - Позиция по X-координате.
 * @property {int} y - Позиция по Y-координате.
 * @property {string} direction - Направление игрока.
 */
const player = {
  x: null,
  y: null,
  direction: null,

  /**
   * Инициализирует игрока.
   * @param {int} startX Позиция по X-координате.
   * @param {int} startY Позиция по Y-координате.
   * @param {string} startDirection Начальное направление игрока.
   */
  init(startX, startY, startDirection) {
    this.x = startX;
    this.y = startY;
    this.direction = startDirection;
  },

  /**
   * Ставит направление по переданной нажатой кнопке.
   * @param {string} direction
   */
  setDirection(direction) {
    this.direction = direction;
  },

  /**
   * Обновляет положение объекта игрока на карте.
   */
  makeStep() {
    // Получаем координаты следующей точки.
    const nextPoint = this.getNextStepPoint();
    // Ставим координаты следующей точки вместо текущей.
    this.x = nextPoint.x;
    this.y = nextPoint.y;
  },

  /**
   * Возвращает следующую точку, в которой окажется игрок учитывая его направление.
   * @returns {{x: int, y: int}} Следующая точка игрока.
   */
  getNextStepPoint() {
    // Текущая позиция игрока.
    const point = {
      x: this.x,
      y: this.y,
    };

    // Смещаем игрока на один шаг в зависимости от направления.
    switch (this.direction) {
      case 'up':
        point.y--;
        break;
      case 'right':
        point.x++;
        break;
      case 'down':
        point.y++;
        break;
      case 'left':
        point.x--;
        break;
    }

    // Возвращаем позицию игрока после смещения.
    return point;
  },
};

/**
 * Объект игры, здесь будут все методы и свойства связанные с ней.
 * @property {player} player Игрок, участвующий в игре.
 * @property {settings} settings Настройки игры.
 * @property {Array} cellElements Массив ячеек нашей игры.
 * @property {HTMLElement} containerElement Контейнер, где будет размещаться наша игра.
 */
const game = {
  player,
  settings,
  cellElements: null,
  containerElement: null,

  /**
   * Запускает игру.
   */
  run() {
    // Инициализируем игру.
    this.init();

    // Ставим интервал, функция будет вызываться каждый рез через определенный интервал времени.
    setInterval(() => {
      // Если пользователь может сделать следующий шаг.
      if (this.canPlayerMakeStep()) {
        // Обновляем позицию игрока.
        this.player.makeStep();
        // Перерисовываем цвета ячеек.
        this.render();
      }
    }, 1000 / this.settings.stepsInSecond);
  },

  /**
   * Инициирует все значения для игры.
   */
  init() {
    // Инициализируем игрока.
    this.player.init(this.settings.startPositionX, this.settings.startPositionY, this.settings.startDirection);
    // Ставим контейнер игры.
    this.containerElement = document.getElementById('game');
    // Инициируем ячейки.
    this.initCells();
    // Инициируем обработчики событий
    this.initEventHandler();
  },

  /**
   * Инициирует ячейки в игре.
   */
  initCells() {
    // Очищаем контейнер для игры.
    this.containerElement.innerHTML = '';
    // Массив ячеек пока пуст.
    this.cellElements = [];
    // Пробегаемся в цикле столько раз, какое количество строк в игре.
    for (let row = 0; row < this.settings.rowsCount; row++) {
      // Создаем новую строку.
      const trElem = document.createElement('tr');
      // Добавляем строку в контейнер с игрой.
      this.containerElement.appendChild(trElem);
      // В каждой строке пробегаемся по циклу столько раз, сколько у нас колонок.
      for (let col = 0; col < this.settings.colsCount; col++) {
        // Создаем ячейку.
        const cell = document.createElement('td');
        // Записываем ячейку в массив ячеек.
        this.cellElements.push(cell);
        // Добавляем ячейку в текущую строку.
        trElem.appendChild(cell);
      }
    }
  },

  /**
   * Инициирует обработчики событий.
   */
  initEventHandler() {
    // При нажатии на любую клавишу в документе вызовется функция keyDownHandler.
    document.addEventListener('keydown', event => this.keyDownHandler(event));
  },

  /**
   * Обработчик события нажатия кнопки на клавиатуре.
   * @param {KeyboardEvent} event Событие, которое произошло.
   */
  keyDownHandler(event) {
    // В зависимости от нажатой клавиши ставим направление игрока.
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        return this.player.setDirection('up');
      case 'KeyD':
      case 'ArrowRight':
        return this.player.setDirection('right');
      case 'KeyS':
      case 'ArrowDown':
        return this.player.setDirection('down');
      case 'KeyA':
      case 'ArrowLeft':
        return this.player.setDirection('left');
    }
  },

  /**
   * Отображает в ячейках игровую информацию.
   */
  render() {
    // Всем ячейкам ставим цвет пустых ячеек.
    this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.emptyCellColor);

    // Получаем ячейку игрока.
    const playerCell = document
      .querySelector(`tr:nth-child(${this.player.y + 1})`)
      .querySelector(`td:nth-child(${this.player.x + 1})`)
    ;

    // Ячейке с игроком ставим цвет ячейки игрока.
    playerCell.style.backgroundColor = this.settings.playerCellColor;
  },

  /**
   * Определяет может ли игрок совершить шаг.
   * @return {boolean} true, если шаг возможен, иначе false.
   */
  canPlayerMakeStep() {
    const nextPoint = this.player.getNextStepPoint();
    return nextPoint.x >= 0 &&
      nextPoint.x < this.settings.colsCount &&
      nextPoint.y >= 0 &&
      nextPoint.y < this.settings.rowsCount;
  },
};

// Запускаем игру.
window.onload = () => game.run();