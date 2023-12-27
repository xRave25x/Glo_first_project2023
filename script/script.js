'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 85,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: () => {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = parseInt(appData.screenPrice);
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: (num) => {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getRollbackMessage: (price) => {
        if (price >= 30000){
            return 'Даем скидку 10%'
        }
        if (price > 15000 && appData.fullPrice < 30000){
            return 'Даем скидку 5%'
        }
        if (price <= 15000 && appData.fullPrice >= 0){
            return 'Скидка не предусмотрена'
        }
        if (price < 0){
            return 'Что то пошло не так'
        } 
    },
    getAllServicePrices: () => {
        let sum = 0;
        let price;
    
        for(let i = 0; i < 2; i++){
    
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
            do{
            price = prompt('Сколько это будет стоить?');
            } while(!appData.isNumber(price))
            sum += parseInt(price); 
        }
        return sum;
    },
    getFullPrice: (screenP, allServiceP) => {
        return parseInt(screenP) + parseInt(allServiceP);
    },
    getTitle: (upTitle) => {
        if (!upTitle) return upTitle;
        return upTitle[0].toUpperCase() + upTitle.slice(1);
    },
    getServicePercentPrices: (fullP, rollB) => {
        return Math.ceil(fullP- rollB);
    },
    start: () => {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.title = appData.getTitle(appData.title);
        appData.logger();
    },
    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for(let key in appData){
            console.log('метод: ' + key + ' ' + ' Своиство: ' + appData[key]);
        }
    }
}

appData.start();
