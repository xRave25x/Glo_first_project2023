'use strict';
const title = document.getElementsByTagName('h1')[0];
const start = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const rollbackInput = document.querySelector('.rollback input[type=range]');
console.log(rollbackInput);
const rollbackSpan = document.querySelector('.rollback span.range-value');
console.log(rollbackSpan);


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screen = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    rollback: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    isError: false,

    init: () => {
        appData.addTitle()
        start.addEventListener('click', appData.CheckError)
        plus.addEventListener('click',appData.addScreenBlock)
        rollbackInput.addEventListener('input', appData.changeRollBack);
        
        
    },
    CheckError: function () {
        screen = document.querySelectorAll('.screen');

        appData.isError = false;

        screen.forEach(function (screen){
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if(select.value === '' || input.value === ''){
            appData.isError = true;
            }
        });

        if(!appData.isError) {
            appData.start();
        }
    },
    start: () => {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.logger();
        appData.showResult();
        appData.showRollBack();

    },
    addTitle: () => {
        document.title = title.textContent;
    },
    showResult: () => {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },

    showRollBack: () => {
        rollbackSpan.textContent = appData.rollback + '%';
        rollbackInput.value = appData.rollback;
    },

    changeRollBack: function (event) {
        rollbackSpan.textContent = appData.rollback + '%';
        appData.rollback = event.target.value;
    },

    addScreens: () => {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screen, index)=> {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            appData.screens.push({
                id: index,
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value
            })
            
        });

    },
    addServices: () => {
        percent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if(check.checked){
            appData.servicesPercent[label.textContent] = +input.value
        }
        })
        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
    
            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value
            }   
            })
    },
    addScreenBlock: () => {
        const cloneScreen = screen[0].cloneNode(true)
        screen[screen.length -1].after(cloneScreen)
    },
    addPrices: () =>{
        appData.screenPrice = appData.screens.reduce(function (sum, screen) {
            return sum + +screen.price
        }, 0)
        
        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        console.log(appData);

        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice * (appData.rollback / 100));

        appData.screenCount = appData.screens.reduce((sum,item) => {
            return sum + +item.count;
        }, 0);

        totalCount.value = appData.screenCount;
    },
    
    logger: () => {

        // console.log(appData.fullPrice);
        // console.log(appData.servicePercentPrice);
        // for(let key in appData){
        //     console.log('метод: ' + key + ' ' + ' Своиство: ' + appData[key]);
        // }
    }

}

appData.init();
