export class Member {
    public id?: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
    }
}