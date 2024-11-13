export class User {
  iduser: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  reguser: number;
  permission: string;
  role: string;

  constructor(
    iduser: number = 0,
    name: string = '',
    surname: string = '',
    username: string = '',
    password: string = '',
    email: string = '',
    reguser: number = 0,
    permission: string = 'ADD',
    role: string = 'USER'
  ) {
    this.iduser = iduser;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.reguser = reguser;
    this.permission = permission;
    this.role = role;
  }
}
