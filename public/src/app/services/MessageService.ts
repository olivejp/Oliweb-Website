import {Injectable} from '@angular/core';
import {Message} from "../domain/message.model";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class MessageService {

  constructor() { }

  getMessagesByChatUid(chatUid: string): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/messages/' + chatUid)
        .orderByChild('/timestamp')
        .on('value', (data: DataSnapshot) => {
            const messages = [];
            if (data) {
              data.forEach(child => {
                if (child.val()) {
                  messages.push(child.val());
                  return false;
                } else {
                  return true;
                }
              });
              resolve(messages);
            } else {
              reject(new Error('Aucun enregistrement retourné'));
            }
          }
        );
    });
  }
}
