import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import {Annonce} from '../domain/annonce.model';
import {FirebaseUtilityService} from './FirebaseUtilityService';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class AnnonceService implements OnInit {

  selectedAnnonce: Annonce;
  annonces: Annonce[] = [];
  annoncesSubject = new Subject<any[]>();

  errors: String[] = [];
  errorsSubject = new Subject<any[]>();

  ngOnInit() {
  }

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  emitAnnonces() {
    this.annoncesSubject.next(this.annonces);
  }

  emitErrors() {
    this.errorsSubject.next(this.errors);
  }

  setSelectedAnnonce(annonce: Annonce) {
    this.selectedAnnonce = annonce;
  }

  getSelectedAnnonce() {
    return this.selectedAnnonce;
  }

  getAnnonces() {
    this.annonces = [];
    firebase.database().ref('/annonces')
      .on('value', (data: DataSnapshot) => {
          if (data) {
            this.annonces = [];
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

  saveAnnonce(annonce: Annonce): Promise<any> {
    return new Promise((resolve, reject) =>
      this.firebaseUtilityService.getServerTimestamp()
        .then(timestamp => {
          // Récupération d'une nouvelle UID
          const newPostKey = firebase.database().ref('annonces').push().key;

          // Update de l'annonce (uid & date publication)
          annonce.datePublication = timestamp;
          annonce.uuid = newPostKey;
          annonce.categorie.id = Number(annonce.categorie.id);

          // Tentative de sauvegarde dans Firebase
          return firebase.database().ref('/annonces/' + newPostKey).set(annonce);
        })
    );
  }

  getAnnoncesListener() {
    this.annonces = [];
    firebase.database().ref('/annonces')
      .on('child', (data: DataSnapshot) => {
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
