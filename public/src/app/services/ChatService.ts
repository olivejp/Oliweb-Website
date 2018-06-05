import {Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {Annonce} from "../domain/annonce.model";
import {FirebaseUtilityService} from "./FirebaseUtilityService";
import DataSnapshot = firebase.database.DataSnapshot;
import {Chat} from "../domain/chat.model";

@Injectable()
export class ChatService implements OnInit {

  ngOnInit() {
  }

  chats: Chat[] = [];

  constructor() {
  }

  getChatsByUidUser(uidUser: string): Promise<Chat[]> {
    this.chats = [];
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/chats')
        .orderByChild("/members/" + uidUser)
        .on('value', (data: DataSnapshot) => {
            this.chats = [];
            if (data) {
              data.forEach(child => {
                if (child.val()) {
                  this.chats.push(child.val());
                  return false;
                } else {
                  return true;
                }
              });
              resolve(this.chats);
            } else {
              reject(new Error('Aucun enregistrement retourné'));
            }
          }
        );
    });
  }
}
