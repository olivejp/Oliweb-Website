import * as firebase from "firebase";
import {Injectable} from "@angular/core";
import {User} from "../domain/user.model";
import {Subject} from "rxjs/Subject";
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable()
export class SignInService {

  // TODO repasser à false quand on est en production
  // isAuth = false;
  isAuth = true;
  userAuthenticated: User;
  authSubject = new Subject<boolean>();
  provider: string;

  userQualification: User = new User("WmWRENgvKsP6T9Azu0f2MiNItQN2",
    "cjJCqb3EEAs:APA91bHX3I2y3aunYkr8kGyTSEn57Z1GlbNHFC-NOK8Fb7KgAjZnBoS3DS-7r7qqY09QLMozqdGP72r-62llD9W0U4F_VYc00GXyEB0iZoIui2rirco8mZdrhjCi5-TxLTNnb06iGj7_",
    "Jean-Paul OLIVE",
    "orlanth23@gmail.com",
    "https://lh5.googleusercontent.com/-PDldmqgwgkg/AAAAAAAAAAI/AAAAAAAAEZk/qSbWnkGyFH4/s96-c/photo.jpg",
    20190125093058404,
    20190125093058404
  );

  constructor() {
  }

  emitIsAuth() {
    this.authSubject.next(this.isAuth);
  }

  signInGoogle() {
    return firebase.auth().signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.isAuth = true;
        this.provider = 'google';
        this.emitIsAuth();
        return user;
      })
      .catch(reason => console.error(reason));
  }

  signInFacebook() {
    return firebase.auth().signInWithPopup(new FacebookAuthProvider)
      .then((user) => {
        this.isAuth = true;
        this.provider = 'facebook';
        this.emitIsAuth();
        return user;
      })
      .catch(reason => console.error(reason));
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
    // TODO Enlever quand on passe en production
    return this.userQualification;
    // return this.userAuthenticated;
  }

  signOutGoogle() {
    window.location.assign('https://accounts.google.com/logout');
  }
}
