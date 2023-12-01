export class User {
    public firstName: string;
    public lastName: string;
    public birthDate: number;
    public address: string;
    public zipCode: number;
    public city: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }
}