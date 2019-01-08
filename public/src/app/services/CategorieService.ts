import {Injectable, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {Categorie} from "../domain/categorie.model";
import {Subject} from "rxjs/Subject";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class CategorieService implements OnInit {
  ngOnInit() {
  }

  categories: Categorie[] = [];
  categoriesSubject = new Subject<any[]>();

  constructor() {
  }

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }

  listenCategories() {
    this.categories = [];
    firebase.database().ref('/categorie')
      .on('value', (data: DataSnapshot) => {
          if (data) {
            this.categories = [];
            data.forEach(child => {
              if (child.val()) {
                this.categories.push(child.val());
                return false;
              } else {
                return true;
              }
            });
            this.emitCategories();
          }
        }
      );
  }

  getAllCategories(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categorie').once('value').then(
          (data) => {
            const categoriesRead = [];
            if (data) {
              data.forEach(child => {
                categoriesRead.push(new Categorie(child.key, child.val()));
              });
            }
            resolve(categoriesRead);
          }, (error) => {
            console.log(error);
            reject(error);
          }
        );
      }
    );
  }
}
