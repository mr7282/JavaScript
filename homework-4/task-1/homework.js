"use strict"

let number = +prompt("Введите целое число от 0 до 999");
let classesNumber = {};

/**
 * This variable gets the number from the user and distributes it by clases 
 * @param {number} n - this variable gets a number from the user
 */
function getNumber(n) {
    let convert = String(n);
    let convertLenght = convert.length; // почему не получается в switch сразу передать свойство lenght строчного массива convert?
    if (Number.isInteger(n) && n < 1000  && n > 0){
        classesNumber = {
        firstDigit: 0,
        secondDigit: 0,
        thirdDigit: 0,
        };
        switch (convertLenght) {
            case 3:
                classesNumber.thirdDigit = +convert[0];
                classesNumber.secondDigit = +convert[1];
                classesNumber.firstDigit = +convert[2];
                break;
            case 2:
                classesNumber.secondDigit = +convert[0];
                classesNumber.firstDigit = +convert[1];
                break;
            case 1:
                classesNumber.firstDigit = +convert[0];
                break;
        }
        console.log(classesNumber);
    } else {
        console.log(`Введено не верное число. ${classesNumber}`);
    }
}

getNumber(number);