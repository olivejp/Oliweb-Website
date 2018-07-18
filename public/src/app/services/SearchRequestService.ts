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

  constructor() {
  }

  saveRequest(from: number, size: number, query: string, order: string): string {
    const newRequestKey = firebase.database().ref('requests').push().key;

    let request = {
      "from": from,
      "size": size,
      "query": {
        "multi_match": {
          "query": query,
          "fields": ["titre", "description"]
        }
      },
      "sort": [{
        "datePublication": {
          "order": order
        }
      }]
    };

    // Tentative de sauvegarde dans Firebase
    firebase.database().ref('/requests/' + newRequestKey).set(request);
    return newRequestKey;
  };
}
