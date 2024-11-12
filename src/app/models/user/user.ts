export class User {
  iduser : number;
  name : string;
  surname : string;
  username : string;
  password : string;
  email : string;
  admin : number;
  moderator : number;
  reguser : number;

  constructor() {
    this.iduser = 0;
    this.name = '';
    this.surname = '';
    this.username = '';
    this.password = '';
    this.email = '';
    this.admin = 0;
    this.moderator = 0;
    this.reguser = 0;
  }
}
