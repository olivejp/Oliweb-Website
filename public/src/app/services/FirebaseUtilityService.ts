import {Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {Annonce} from "../domain/annonce.model";
import DataSnapshot = firebase.database.DataSnapshot;
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
            }, (error) => {
              reject(error);
            }
          );
        }
      })
    });
  }
}

