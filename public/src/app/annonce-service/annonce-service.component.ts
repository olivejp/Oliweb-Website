import {Component, Injectable, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-annonce-service',
  templateUrl: './annonce-service.component.html',
  styleUrls: ['./annonce-service.component.scss']
})

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
      .on('value', (data) => {
          const test = data.val();
          this.annonces = data.val() ? data.val() : [];
          const tet1 = this.annonces[0];
          this.emitAnnonces();
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
