export class User {
  constructor(public uid?: string,
              public tokenDevice?: string,
              public profile?: string,
              public email?: string,
              public photoUrl?: string,
              public dateLastConnexion?: number,
              public dateCreation?: number) {
  }
}
