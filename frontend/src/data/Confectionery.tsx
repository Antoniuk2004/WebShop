class Confectionery {
    public name: string
    public weight: number
    public image: string
    public packageQuantity: number
    public description: string
    public price: number
    public brand: string
    public numberOfSoldItems: number
    public country: string
    public numberOfAvailableItems: number
    public ingredients: string

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
