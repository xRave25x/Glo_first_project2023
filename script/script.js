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
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = fullPrice - rollback;
console.log(Math.ceil(servicePercentPrice));


if (fullPrice >= 30000){
    console.log('Даем скидку 10%');
}else if (fullPrice >= 15000 && fullPrice <= 30000){
    console.log('Даем скидку 5%');
}else if (fullPrice <= 15000 && fullPrice >= 0){
    console.log('Скидка не предусмотрена');
}else {
    console.log('Что то пошло не так');
} 



console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("стоимость верстки экранов " + screenPrice + " долларов" 
+ " и " + "стоимость разработки сайта " + fullPrice + " долларов" );
console.log(screens.toLocaleLowerCase().split(","));
console.log(fullPrice * (rollback / 100));

