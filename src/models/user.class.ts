import { EmailValidator } from "@angular/forms";

export class User {
    public firstName: string;
    public lastName: string;
    public birthDate: number;
    public address: string;
    public zipCode: number;
    public city: string;
    public email: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
    }

    public toJSON() {
        console.log('toJSON wurde aufgerufen');
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email
        };
      }
    }
