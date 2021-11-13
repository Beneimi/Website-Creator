import {prop} from "@typegoose/typegoose";

export class User {
    @prop()
    email: string;
    @prop()
    name: string;
    @prop()
    password: string;
    @prop()
    role: string;

    constructor (name: string, email: string, password: string, role: string) {
      this.email = email
      this.name = name
      this.password = password
      this.role = role
    }
}
