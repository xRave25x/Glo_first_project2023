
let title = "first_project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 100;
let rollback = 85;
let fullPrice = 100000;
let adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("стоимость верстки экранов " + screenPrice + " долларов" 
+ " и " + "стоимость разработки сайта " + fullPrice + " долларов" );
console.log(screens.toLocaleLowerCase().split(","));
console.log(fullPrice * (rollback / 100));