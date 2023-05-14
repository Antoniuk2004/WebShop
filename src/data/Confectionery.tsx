import { count } from "console"

class Confectionery {
    name: string
    weight: number
    image: string
    packageQuantity: number
    description: string
    price: number
    brand: string
    numberOfSoldItems: number
    country: string
    numberOfAvailableItems: number
    ingredients: string

    constructor(name: string, weight: number, image: string,
        packageQuantity: number, description: string, price: number, 
        numberOfSoldItems: number, brand: string, country: string, numberOfAvailableItems: number, ingredients:string) {
        this.name = name
        this.weight = weight
        this.image = image
        this.packageQuantity = packageQuantity
        this.description = description
        this.price = price
        this.brand = brand
        this.numberOfSoldItems = numberOfSoldItems
        this.country = country
        this.numberOfAvailableItems = numberOfAvailableItems
        this.ingredients = ingredients
    }    
}

class Chocolate extends Confectionery {

}

class Cookies extends Confectionery {

}
class Biscuits extends Confectionery {

}
class Candies extends Confectionery {
}
class Cakes extends Confectionery {
}


export {Chocolate, Cookies, Biscuits, Candies, Cakes, Confectionery}
