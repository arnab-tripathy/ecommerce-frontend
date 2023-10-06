export class Address {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    street: string;
    city: string;
    state: string;

    constructor(firstName: string, lastName: string, mobileNumber: string, Street: string, City: string, State: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this.street = Street;
        this.city = City;
        this.state = State;
    }

}
