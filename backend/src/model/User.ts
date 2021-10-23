export class User{
    email: string;
    name: string;
    password: string;
    role: string;

    constructor(name: string, email: string, password: string, role: string) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
    }


}