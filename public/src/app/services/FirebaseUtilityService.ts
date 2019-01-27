import * as firebase from "firebase";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import ServerValue = firebase.database.ServerValue;

@Injectable()
export class FirebaseUtilityService {

  constructor() {
  }

  // TODO finir l'implémentation d'une méthode pour généraliser les listeners
  listenQuery(query: firebase.database.Query): Observable<any> {
    return Observable.create(observer => {
      query.on('child_changed', function (data) {
        observer.next(data.val());
      });
    })
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

