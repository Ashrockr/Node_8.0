export class User {
    id: String;
    name: String;
    email: String;
    password: String;
    gender: String;
    isAdmin: Boolean;
    avatar: String;

    constructor(id: String, name: String, email: String, password: String, gender: String,isAdmin:Boolean,avatar: String) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.isAdmin = isAdmin;
        this.avatar = avatar;
    }

}