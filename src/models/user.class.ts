import { EmailValidator } from "@angular/forms";

export class User {
    public id?: string;
    public firstName: string;
    public lastName: string;
    public birthDate: number;
    public address: string;
    public zipCode: number;
    public city: string;
    public email: string;
    public level?: number;
    public notes?:string;
    public issue?:boolean;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.level = obj ? obj.level : 0;
        this.notes = obj ? obj.notes : '';
        this.issue = obj ? obj.issue : '';
    }


    public toJSON() {
      const json = {
        id: this.id !== undefined ? this.id : '',
        firstName: this.firstName !== undefined ? this.firstName : '',
        lastName: this.lastName !== undefined ? this.lastName : '',
        birthDate: this.birthDate !== undefined ? this.birthDate : '',
        address: this.address !== undefined ? this.address : '',
        zipCode: this.zipCode !== undefined ? this.zipCode : '',
        city: this.city,
        email: this.email,
        level: this.level !== undefined ? this.level : 0, 
        notes: this.notes !== undefined ? this.notes : '', 
        issue: this.issue !== undefined ? this.issue : false, 
      };      
      return json;
    }
          
    }
