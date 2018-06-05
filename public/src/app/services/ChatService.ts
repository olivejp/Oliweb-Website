import {Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {Annonce} from "../domain/annonce.model";
import {FirebaseUtilityService} from "./FirebaseUtilityService";
import DataSnapshot = firebase.database.DataSnapshot;
import {Chat} from '../domain/chat.model';

@Injectable()
export class ChatService implements OnInit {

  ngOnInit() {
  }

  constructor() {
  }

  getChatsByUidUser(uidUser: string): Promise<Chat[]> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/chats')
        .orderByChild('/members/' + uidUser)
        .on('value', (data: DataSnapshot) => {
            const chats = [];
            if (data) {
              data.forEach(child => {
                if (child.val()) {
                  chats.push(child.val());
                  return false;
                } else {
                  return true;
                }
              });
              resolve(chats);
            } else {
              reject(new Error('Aucun enregistrement retourné'));
            }
          }
        );
    });
  }
}
