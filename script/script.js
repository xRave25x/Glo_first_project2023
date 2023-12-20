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

const  getAllServicePrices = function (sp1, sp2) {
    return sp1 + sp2
}

function  getFullPrice(sp, asp) {
    return sp + asp;
}

const getTitle = function (UpTitle) {
    if (!UpTitle) return UpTitle;
    return UpTitle[0].toUpperCase() + UpTitle.slice(1);
}

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getAllServicePrices(screenPrice, allServicePrices);

const getServicePercentPrices = function (fp, roll) {
    return Math.ceil(fp - roll);
}

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getTitle(title);

console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
console.log(screens.toLocaleLowerCase().split(","));

