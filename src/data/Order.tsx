class Order {
    firstName: String
    sescondName: String
    phoneNumber: Number
    adress: String
    apartment: String
    city: String
    postalCode: Number
    email: String
    country: String
    items: Array<Item>

    constructor(firstName: String, secondName: String, phoneNumber: Number,
        adress: String, apartment: String, city: String, postalCode: Number,
        email: String, country: String, items:Array<Item>) {
        this.firstName = firstName
        this.sescondName = secondName
        this.phoneNumber = phoneNumber
        this.adress = adress
        this.apartment = apartment
        this.city = city
        this.postalCode = postalCode
        this.email = email
        this.country = country
        this.items = items
    }
}

interface Item{
    name: String,
    type: String,
    quantity: Number
}

export {Order}
export type {Item}