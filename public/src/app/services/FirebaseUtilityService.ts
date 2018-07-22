import * as firebase from "firebase";
import {Injectable} from '@angular/core';
import ServerValue = firebase.database.ServerValue;

@Injectable()
export class FirebaseUtilityService {

  constructor() {
  }

  getServerTimestamp(): Promise<number> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('timestamp').child('now').set(ServerValue.TIMESTAMP, function (error) {
        if (error) {
          reject(error);
        } else {
          firebase.database().ref('timestamp').child('now').once('value').then(
            (data) => {
              resolve(data.val());
            }, (error1) => {
              reject(error1);
            }
          );
        }
      })
    });
  }
}

