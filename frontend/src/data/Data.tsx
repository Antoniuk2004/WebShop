import storage from './storage.json';
import * as Confectionery from "./Confectionery";

let arrOfChocolates: Array<Confectionery.Chocolate> = [];
let arrOfCookies: Array<Confectionery.Cookies> = [];
let arrOfBuiscuits: Array<Confectionery.Biscuits> = [];
let arrOfCandies: Array<Confectionery.Candies> = [];
let arrOfCakes: Array<Confectionery.Candies> = [];

for (const [key, value] of Object.entries(storage.chocolate)) {
    arrOfChocolates.push(new Confectionery.Chocolate(value.name, value.weight, value.image,
        value.packageQuantity, value.description, value.price, value.numberOfSoldItems, 
        value.brand, value.country, value.numberOfAvailableItems, value.ingredients));
}

for (const [key, value] of Object.entries(storage.cookies)) {
    arrOfCookies.push(new Confectionery.Cookies(value.name, value.weight, value.image,
        value.packageQuantity, value.description, value.price, value.numberOfSoldItems, 
        value.brand, value.country, value.numberOfAvailableItems, value.ingredients));
}

for (const [key, value] of Object.entries(storage.biscuits)) {
    arrOfBuiscuits.push(new Confectionery.Biscuits(value.name, value.weight, value.image,
        value.packageQuantity, value.description, value.price, value.numberOfSoldItems, 
        value.brand, value.country, value.numberOfAvailableItems, value.ingredients));
}

for (const [key, value] of Object.entries(storage.candies)) {
    arrOfCandies.push(new Confectionery.Candies(value.name, value.weight, value.image,
        value.packageQuantity, value.description, value.price, value.numberOfSoldItems, 
        value.brand, value.country, value.numberOfAvailableItems, value.ingredients));
}

for (const [key, value] of Object.entries(storage.cakes)) {
    arrOfCakes.push(new Confectionery.Cakes(value.name, value.weight, value.image,
        value.packageQuantity, value.description, value.price, value.numberOfSoldItems, 
        value.brand, value.country, value.numberOfAvailableItems, value.ingredients));
}

const arrOfAllTypesOfConfectioneries = [...arrOfChocolates, ...arrOfCookies, ...arrOfBuiscuits, ...arrOfCandies, ...arrOfCakes];

export {arrOfChocolates, arrOfCookies, arrOfBuiscuits, arrOfCandies, arrOfCakes, arrOfAllTypesOfConfectioneries};