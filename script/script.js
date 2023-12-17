
const title = "first_project";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 100;
const rollback = 85;
const fullPrice = 100000;
const adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("стоимость верстки экранов " + screenPrice + " долларов" 
+ " и " + "стоимость разработки сайта " + fullPrice + " долларов" );
console.log(screens.toLocaleLowerCase().split(","));
console.log(fullPrice * (rollback / 100));