'use strict';
const title = document.getElementsByTagName('h1')[0];
const start = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const rollbackInput = document.querySelector('.rollback input[type=range]');
const rollbackSpan = document.querySelector('.rollback span.range-value');
const checkbox = document.querySelectorAll('.custom-checkbox');



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

    init: function () {
        this.addTitle()
        start.addEventListener('click', this.CheckError.bind(this));
        plus.addEventListener('click',this.addScreenBlock);
        rollbackInput.addEventListener('input', this.changeRollBack.bind(this));
        reset.addEventListener('click', this.isReset.bind(this));
        
        
    },
    CheckError: function () {
        screen = document.querySelectorAll('.screen');

        this.isError = false;

        screen.forEach( (screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if(select.value === '' || input.value === ''){
            this.isError = true;
            }
        });

        if(!this.isError) {
            console.log(this);
            this.start();
            reset.style.display = 'block';
            start.style.display = 'none';
        }
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.logger();
        this.showResult();
        this.disabledFields();

    },
    reset: function () {

        this.enabledFields();
        this.clearFields();
        this.deleteFields();
        this.rangeClear();
        this.clearData();
        this.showResult();

    },
    isReset: function () {
        this.reset();
        reset.style.display = 'none';
        start.style.display = 'block';
    },

    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screenCount;
    },

    changeRollBack: function (event) {
        this.rollback = event.target.value;
        rollbackSpan.textContent = this.rollback + '%';
        
    },

    addScreens: function () {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screen, index)=> {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            this.screens.push({
                id: index,
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value
            })
            
        });

    },
    disabledFields: function () {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screen)=> {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            input.disabled = true;
            select.disabled = true;
            plus.disabled = true;

            for(let i = 0; i<checkbox.length; i++){
                checkbox[i].disabled= true;
            }
            
        });

    },
    enabledFields: function () {
        screen = document.querySelectorAll('.screen');
        
        screen.forEach((screen)=> {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            input.disabled = false;
            select.disabled = false;
            plus.disabled = false;

            for(let i = 0; i < checkbox.length; i++){
                checkbox[i].checked = false;
                checkbox[i].disabled= false;
            }
            
        });
        
    },
    clearFields : function () {

        const select = document.querySelector('select');
        const input = document.querySelector('input');
        const allTotal = document.querySelectorAll('.total-input');

        input.value = '';
        select.value = '';

        for (let i = 0; i < allTotal.length; i++){
            allTotal[i].value = '';
        }

    },
    deleteFields: function () {
        screen = document.querySelectorAll('.screen');
        for (let i = screen.length ; i > 1; i--){
    
            screen[(i-1)].remove();    
        }
    },
    clearData: function () {
        
    this.screens = [];  
    this.screenPrice = 0;  
    this.screenCount = 0;  
    this.rollback = 0; 
    this.adaptive = 0;  
    this.servicePricesPercent = 0;  
    this.servicePricesNumber = 0;  
    this.fullPrice = 0;  
    this.servicePercentPrice = 0;
        
    },
    rangeClear: function () {
        rollbackInput.value = 0;
        rollbackSpan.innerHTML = rollbackInput.value + '%';
    },
    addServices: function () {
        percent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if(check.checked){
            this.servicesPercent[label.textContent] = +input.value
        }
        })
        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
    
            if(check.checked){
                this.servicesNumber[label.textContent] = +input.value
            }   
            })
    },
    addScreenBlock: function () {
        const cloneScreen = screen[0].cloneNode(true)
        screen[screen.length -1].after(cloneScreen)
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, screen) => {
            return sum + +screen.price
        }, 0)
        
        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for(let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        console.log(this);

        this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice * (this.rollback / 100));

        this.screenCount = this.screens.reduce((sum,item) => {
            return sum + +item.count;
        }, 0);

    },
    
    logger: function () {

        // console.log(appData.fullPrice);
        // console.log(appData.servicePercentPrice);
        // for(let key in appData){
        //     console.log('метод: ' + key + ' ' + ' Своиство: ' + appData[key]);
        // }
    }

}

appData.init();
