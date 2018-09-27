import {Injectable, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {Chat} from '../domain/chat.model';
import DataSnapshot = firebase.database.DataSnapshot;

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
