import {Message} from "../domain/message.model";
import * as firebase from "firebase";
import {FirebaseUtilityService} from "./FirebaseUtilityService";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class MessageService {

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  sendMessage(message: Message): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firebaseUtilityService.getServerTimestamp()
        .then(timestamp => {
          message.uidMessage = firebase.database().ref('/messages/').push().key;
          message.timestamp = timestamp;
          firebase.database().ref('/messages/' + message.uidChat + '/' + message.uidMessage).set(message)
            .then(value => resolve(value))
            .catch(reason => reject(reason));
        })
        .catch(reason => reject(reason));
    });
  }

  listenForAddedMessagesByChatUid(chatUid: string): Observable<Message> {
    return Observable.create(observer => {
      firebase.database()
        .ref('/messages/' + chatUid)
        .on('child_added', function(data) {
          observer.next(data.val());
        });
    })
  }

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
