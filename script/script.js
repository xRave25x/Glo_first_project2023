'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 85,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    start: () => {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.getTitle(appData.title);
        appData.logger();
    },
    asking: () => {

        do{
            appData.title = prompt('Как называется ваш проект?');
        } while(!isNaN(appData.title));
        

        for(let i = 0; i < 2; i++){
            let name;
            let price = 0;

            do {
                name = prompt('Какие типы экранов нужно разработать?')
            } while (!isNaN(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));
            
            appData.screens.push({id: i, name: name, price: +price})
        }

        for(let i = 0; i < 2; i++){
            let name;
            let price = 0;

            do{
                name = prompt('Какой дополнительный тип услуги нужен?');
            }while(!isNaN(name));
            

            do{
            price = prompt('Сколько это будет стоить?');
            } while(!appData.isNumber(price));

            appData.services[`${name} ${i}`] = +price; 
            
        }
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: () =>{
        appData.screenPrice = appData.screens.reduce(function (sum, screen) {
            return sum + screen.price
        }, 0)

        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
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
    getFullPrice: (screenP, allServiceP) => {
        appData.fullPrice = parseInt(screenP) + parseInt(allServiceP);
    },
    getTitle: (upTitle) => {
        if (!upTitle) return upTitle;
        appData.title = upTitle[0].toUpperCase() + upTitle.slice(1);
    },
    getServicePercentPrices: (fullP, rollB) => {
        appData.servicePercentPrice = Math.ceil(fullP- rollB);
    },
    
    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        // for(let key in appData){
        //     console.log('метод: ' + key + ' ' + ' Своиство: ' + appData[key]);
        // }
        console.log(appData.screens);
        console.log(appData.services);
    }
}

appData.start();
