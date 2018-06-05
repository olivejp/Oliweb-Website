import * as firebase from "firebase";
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Injectable} from "@angular/core";
import {User} from "../domain/user.model";
import {Subject} from "rxjs/Subject";
import {ChatService} from "./ChatService";

@Injectable()
export class SignInService {

  isAuth = false;
  userAuthenticated: User;
  authSubject = new Subject<boolean>();
  provider: string;

  constructor() {
  }

  emitIsAuth() {
    this.authSubject.next(this.isAuth);
  }

  signInGoogle() {
    return firebase.auth().signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.provider = 'google';
        return user;
      });
  }

  signInFacebook() {
    return firebase.auth().signInWithPopup(new FacebookAuthProvider)
      .then((user) => {
        this.provider = 'facebook';
        return user;
      });
  }

  signOut(): Promise<any> {
    this.isAuth = false;
    this.userAuthenticated = null;
    this.emitIsAuth();
    return firebase.auth().signOut()
      .then(value => {
        if (this.provider === 'google') {
          this.signOutGoogle();
        }
      });
  }

  setUserAuth(user: User) {
    this.isAuth = true;
    this.userAuthenticated = user;
    this.emitIsAuth();
  }

  getUserAuth(): User {
    return this.userAuthenticated;
  }

  signOutGoogle() {
    window.location.assign('https://accounts.google.com/logout');
  }
}
