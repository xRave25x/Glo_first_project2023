'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
const rollback = 85;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = function(varable) {
    console.log(varable, typeof varable);
}

const getRollbackMessage = function (price) {
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

const  getAllServicePrices = function (serviceP1, serviceP2) {
    return serviceP1 + serviceP2
}

function  getFullPrice(screenP, allServiceP) {
    return screenP + allServiceP;
}

const getTitle = function (upTitle) {
    if (!upTitle) return upTitle;
    return upTitle[0].toUpperCase() + upTitle.slice(1);
}

const getServicePercentPrices = function (fullP, rollB) {
    return Math.ceil(fullP- rollB);
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getAllServicePrices(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getTitle(title);

console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
console.log(screens.toLocaleLowerCase().split(","));

