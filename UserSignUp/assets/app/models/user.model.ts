export class User {
    id: String;
    name: String;
    email: String;
    password: String;
    gender: String;
    isAdmin: Boolean;

    constructor(id: String, name: String, email: String, password: String, gender: String) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.isAdmin = false;
    }

}