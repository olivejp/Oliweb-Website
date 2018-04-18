import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from "firebase";

@Injectable()
export class AnnonceService {

  annonces: any[] = [];
  annoncesSubject = new Subject<any[]>();

  constructor() {
  }

  emitAnnonces() {
    this.annoncesSubject.next(this.annonces);
  }

  getAnnonces() {
    firebase.database().ref('/annonces')
      .on('value', (data: DataSnapshot) => {
          if (data) {
            data.forEach(child => {
              if (child.val()) {
                this.annonces.push(child.val());
                return false;
              } else {
                return true;
              }
            });
            this.emitAnnonces();
          }
        }
      );
  }

  getSingleAnnonce(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/annonces/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
