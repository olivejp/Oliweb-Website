import {Injectable, OnInit} from '@angular/core';
import {User} from "../domain/user.model";
import * as firebase from "firebase";

@Injectable()
export class UserService implements OnInit {
  ngOnInit() {
  }

  constructor() {
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
