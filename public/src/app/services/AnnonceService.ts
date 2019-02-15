import {Annonce} from '../domain/annonce.model';
import {FirebaseUtilityService} from './FirebaseUtilityService';
import {Observable, Subject} from "rxjs";
import {PagedResults} from "../domain/paged.model";
import {Injectable, OnInit} from "@angular/core";
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from "firebase";

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

  getNewUid(): string{
    return firebase.database().ref('annonces').push().key;
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
          firebase.database().ref('/annonces/' + newPostKey).set(annonce)
            .then(value => resolve(value))
            .catch(reason => reject(new Error(reason)));
        })
    );
  }

  getAnnoncesListener() {
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

  getAnnoncesPage(page: number, pageSize: number): Observable<PagedResults<Annonce>> {
    return Observable.create(observer => {
      this.getAnnoncesCount().subscribe(count => {
        this.getAnnoncesPerPage(page, pageSize).subscribe(annonces => {
          observer.next(new PagedResults<Annonce>(annonces, count));
        }, error2 => observer.error(error2))
      }, error1 => observer.error(error1));
    });
  }

  /**
   * Get the total count of annonce in firebase database
   */
  getAnnoncesCount(): Observable<number> {
    return Observable.create(observer => {
      firebase.database().ref('/annonces').on('value', datasnapshot => {
        observer.next(datasnapshot.numChildren());
      })
    });
  }

// TODO finir cette méthode pour l'instant mockée
  getAnnoncesPerPage(page: number, pageSize: number):
    Observable<Annonce[]> {
    return Observable.create(observer => {
      firebase.database().ref('/annonces')
        .on('value', (data: DataSnapshot) => {
            const annonces = [];
            if (data) {
              data.forEach(child => {
                if (child.val()) {
                  annonces.push(child.val());
                  return false;
                } else {
                  return true;
                }
              });
            }
            observer.next(annonces)
          }
        );
    });
  }
}
