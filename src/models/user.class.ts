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
        // Überprüfe, ob die Werte vorhanden sind, andernfalls setze Standardwerte
        const json = {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          address: this.address,
          zipCode: this.zipCode,
          city: this.city,
          email: this.email,
          level: this.level !== undefined ? this.level : 0, // Setze 0, wenn level nicht vorhanden ist
          notes: this.notes !== undefined ? this.notes : '', // Setze leeren String, wenn notes nicht vorhanden ist
          issue: this.issue !== undefined ? this.issue : 'false', // Setze leeren String, wenn issue nicht vorhanden ist
        };      
        return json;
      }
      
    }
