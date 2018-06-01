import * as firebase from "firebase";
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Injectable} from "@angular/core";
import {User} from "../domain/user.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SignInService {

  isAuth = false;
  userAuthenticated: User;
  authSubject = new Subject<boolean>();

  constructor() {
  }

  emitIsAuth() {
    this.authSubject.next(this.isAuth);
  }

  signInGoogle() {
    return firebase.auth().signInWithPopup(new GoogleAuthProvider());
  }

  signInFacebook() {
    return firebase.auth().signInWithPopup(new FacebookAuthProvider);
  }

  signOut() {
    this.isAuth = false;
    this.userAuthenticated = null;
    this.emitIsAuth();
    return firebase.auth().signOut();
  }

  setUserAuth(user: User) {
    this.isAuth = true;
    this.userAuthenticated = user;
    this.emitIsAuth();
  }

  getUserAuth(): User {
    return this.userAuthenticated;
  }
}
