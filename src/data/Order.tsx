class Order {
    firstName: string;
    sescondName: string;
    phoneNumber: string;
    adress: string;
    apartment: string;
    city: string;
    postalCode: number;
    email: string;

    constructor(firstName: string, secondName: string, phoneNumber: string,
        adress: string, apartment: string, city: string, postalCode: number,
        email: string) {
        this.firstName = firstName;
        this.sescondName = secondName;
        this.phoneNumber = phoneNumber;
        this.adress = adress;
        this.apartment = apartment;
        this.city = city;
        this.postalCode = postalCode;
        this.email = email;
    }
}
export default Order