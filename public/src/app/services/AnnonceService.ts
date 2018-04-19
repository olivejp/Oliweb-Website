import {Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {Annonce} from "../domain/annonce.model";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class AnnonceService implements OnInit {
  ngOnInit() {
  }

  annonces: Annonce[] = [];
  annoncesSubject = new Subject<any[]>();

  constructor() {
  }

  emitAnnonces() {
    this.annoncesSubject.next(this.annonces);
  }

  getAnnonces() {
    this.annonces = [];
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

  getSingleAnnonce(uid: string): Promise<Annonce> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/annonces/' + uid).once('value').then(
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
