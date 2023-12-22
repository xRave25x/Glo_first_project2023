'use strict';

let title;
let screens;
let screenPrice;
const rollback = 0;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;



const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = () => {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    screenPrice = prompt('Сколько будет стоить данная работа?');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?');
}

const showTypeOf = (varable) => {
    console.log(varable, typeof varable);
}

const getRollbackMessage = (price) => {
    if (price >= 30000){
        return 'Даем скидку 10%'
    }
    if (price > 15000 && fullPrice < 30000){
        return 'Даем скидку 5%'
    }
    if (price <= 15000 && fullPrice >= 0){
        return 'Скидка не предусмотрена'
    }
    if (price < 0){
        return 'Что то пошло не так'
    } 
}

const  getAllServicePrices = () => {
    let sum = 0;
    let price;

    for(let i = 0; i < 2; i++){

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        do{
        price = prompt('Сколько это будет стоить?');
        } while(!isNumber(price))
        sum += parseInt(price); 
    }
    return sum;
}

function  getFullPrice(screenP, allServiceP) {
    return parseInt(screenP) + parseInt(allServiceP);
}

const getTitle = function (upTitle) {
    if (!upTitle) return upTitle;
    return upTitle[0].toUpperCase() + upTitle.slice(1);
}

const getServicePercentPrices = function (fullP, rollB) {
    return Math.ceil(fullP- rollB);
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);


console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(servicePercentPrice);
console.log(screens.length);

console.log("стоимость верстки экранов " + screenPrice + " долларов" 
+ " и " + "стоимость разработки сайта " + fullPrice + " долларов" );

