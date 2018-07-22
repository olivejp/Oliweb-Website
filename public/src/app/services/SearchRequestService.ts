import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import {Annonce} from '../domain/annonce.model';
import {FirebaseUtilityService} from './FirebaseUtilityService';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class SearchRequestService implements OnInit {

  ngOnInit() {
  }

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  // 1 - Lire le timestamp du serveur
  // 2 - Créer une nouvelle entrée dans le noeud /requests
  // 3 - Retourne la request ID dans une promise
  saveRequest(query: string, from?: number, size?: number, order?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firebaseUtilityService.getServerTimestamp()
        .catch(reason => reject(new Error(reason)))
        .then(timestamp => {

          // Création d'une nouvelle clé pour le noeud /requests
          const newRequestKey = firebase.database().ref('requests').push().key;

          // Création de l'objet qu'on va enregistrer dans Firebase
          let request = {
            "timestamp": timestamp,
            "from": (from) ? from : 0,
            "size": (size) ? size : 25,
            "query": {
              "multi_match": {
                "query": query,
                "fields": ["titre", "description"]
              }
            },
            "sort": [
              {
                "datePublication": {
                  "order": (order) ? order : "ASC"
                }
              },
              "_score"
            ]
          };

          // Tentative de sauvegarde dans Firebase
          firebase.database().ref('/requests/' + newRequestKey)
            .set(request)
            .then(value => resolve(newRequestKey))
            .catch(reason => reject(new Error(reason)));
        });
    });
  };
}
