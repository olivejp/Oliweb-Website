import * as firebase from "firebase";
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Injectable} from "@angular/core";

@Injectable()
export class SignInService  {

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
