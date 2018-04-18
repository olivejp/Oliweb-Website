import * as firebase from "firebase";
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export class UserService  {

  isAuth = false;

  constructor() { }

  static signInGoogle(){
    return firebase.auth().signInWithPopup(new GoogleAuthProvider());
  }

  static signInFacebook(){
    return firebase.auth().signInWithPopup(new FacebookAuthProvider);
  }

  static signOut(){
    return firebase.auth().signOut();
  }
}
