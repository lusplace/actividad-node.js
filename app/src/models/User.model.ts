
export class User{
    constructor(public id: number = -1, 
        public firstName: string = '', 
        public lastName: string = '', 
        public email: string = '', 
        public password: string = '', 
        public username: string = '', 
        public role: string = 'User'
    ){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = username;
        this.role = role;
    }
}
