export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(obj?: any) {
      this.id = obj ? obj.id : '';
      this.name = obj ? obj.name : 'Stranger';
      this.email = obj ? obj.email : '';
      this.password = obj ? obj.password : '';
  }

  public toJSON() {
    const json = {
        id: this.id !== undefined ? this.id : '',
        name: this.name,
        email: this.email,
        password: this.password
    };
    return json;
}
    }
          
