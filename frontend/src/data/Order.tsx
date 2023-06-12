class Order {
    public id: number
    public date: number
    public price: number
    public firstName: string
    public secondName: string
    public phoneNumber: number
    public adress: string
    public apartment: string
    public city: string
    public postalCode: number
    public email: string
    public country: string
    public items: Array<Item>

    constructor(id:number, date:number, price:number, firstName: string, secondName: string, phoneNumber: number,
        adress: string, apartment: string, city: string, postalCode: number,
        email: string, country: string, items:Array<Item>) {
        this.id = id
        this.date = date
        this.price = price
        this.firstName = firstName
        this.secondName = secondName
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
    name: string,
    type: string,
    quantity: number
}

export {Order}
export type {Item}