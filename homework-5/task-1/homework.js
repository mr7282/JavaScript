"use strict";

const settings = {
    colsCount: 8,
    rowCount: 8,
    blackCell: "#b08964",
    whiteCell: "#ecd9b5",
};

const game = {
    settings,
    cellElements: null,
    containerElement: null,

    run() {
        this.init();
        this.initCell();
    },

    init() {
        this.containerElement = document.getElementById("game")
    },

    convertNumber(number) {
        switch (number) {
            case 1:
                return "A";
            case 2:
                return "B";
            case 3:
                return "C";
            case 4:
                return "D";
            case 5:
                return "E";
            case 6:
                return "F";
            case 7:
                return "G";
            case 8:
                return "H";
            default:
                break;
        }
    },

    initCell() {
        let row;

        for (row = (this.settings.rowCount + 1); row > 0 ; row--) {
            const trElem = document.createElement("tr");
            if (row === 1) {
                trElem.id = "lastTr";
            }
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < (this.settings.colsCount + 1); col++) {
                const cell = document.createElement("td");
                cell.style.background = this.settings.whiteCell;
                if ((row % 2) === 0 && (col % 2) != 0) {
                    cell.style.background = this.settings.blackCell;
                } else if ((row % 2) === 1 && (col % 2) === 0) {
                    cell.style.background = this.settings.blackCell;
                }
                if (col === 0 && row === 1) {
                    cell.innerText = "";
                    cell.style.background = "whitesmoke";
                } else if (col === 0) {
                    cell.innerText = `${(row - 1)}`;
                    cell.style.background = "whitesmoke";
                } else if (row === 1) {
                    let symbol = this.convertNumber(col);
                    cell.innerText = `${(symbol)}`;
                    cell.style.background = "whitesmoke";
                }
                trElem.appendChild(cell);
            }

        }
    },
};

window.onload = () => game.run();