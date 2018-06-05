import {Injectable, OnInit} from '@angular/core';
import {User} from "../domain/user.model";
import * as firebase from "firebase";
import {FirebaseUtilityService} from "./FirebaseUtilityService";

@Injectable()
export class UserService implements OnInit {

  ngOnInit() {
  }

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  saveUser(uidUser: string, email: string, tokenDevice: string, profile: string, photoUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.firebaseUtilityService.getServerTimestamp()
        .then(timestamp => {

          // Récupération d'une nouvelle UID
          let user: User;
          user = new User();
          user.uid = uidUser;
          user.tokenDevice = tokenDevice;
          user.photoUrl = photoUrl;
          user.email = email;
          user.profile = profile;
          user.dateCreation = timestamp;
          user.dateLastConnexion = timestamp;

          // Tentative de sauvegarde dans Firebase
          firebase.database().ref("/users/" + uidUser).set(user, function (error) {
            if (error) {
              console.log(error);
              this.errors.push(error.message);
              reject(error);
            } else {
              resolve(true);
            }
          });
        })
    });
  }

  getUser(uidUser: String): Promise<User> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + uidUser).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    );
  }
}
