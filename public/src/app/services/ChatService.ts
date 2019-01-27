import {Injectable, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {Chat} from '../domain/chat.model';
import {Observable} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;
import {FirebaseUtilityService} from "./FirebaseUtilityService";

@Injectable()
export class ChatService implements OnInit {

  ngOnInit() {
  }

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  static queryBuilder(userUid: string): firebase.database.Query {
    return firebase.database()
      .ref('/chats/')
      .orderByChild('/members/' + userUid)
      .equalTo(true);
  }

  listenForAddedChatsByUserUid(userUid: string): Observable<Chat> {
    return Observable.create(observer => {
      ChatService.queryBuilder(userUid).on('child_added', function (data) {
        observer.next(data.val());
      });
    })
  }

  listenForRemovedChatsByUserUid(userUid: string): Observable<string> {
    return Observable.create(observer => {
      ChatService.queryBuilder(userUid).on('child_removed', function (data) {
        observer.next(data.key);
      });
    })
  }

  listenForChangedChatsByUserUid(userUid: string): Observable<Chat> {
    return Observable.create(observer => {
      ChatService.queryBuilder(userUid).on('child_changed', function (data) {
        observer.next(data.val());
      });
    })
  }

  // Will return the chat updated
  createChat(chat: Chat): Promise<Chat> {
    return new Promise((resolve, reject) => {
      this.firebaseUtilityService.getServerTimestamp()
        .then(timestamp => {

          // Récupération d'une nouvelle UID pour le chat
          const newPostKey = firebase.database().ref('chats').push().key;

          // Update creation and update time
          chat.uid = newPostKey;
          chat.creationTimestamp = timestamp;
          chat.updateTimestamp = timestamp;

          // Tentative de sauvegarde dans Firebase
          firebase.database().ref('/chats/' + newPostKey).set(chat)
            .then(value => resolve(chat))
            .catch(reason => reject(new Error(reason)));
        })
    });
  }

  getChatsByUidUser(uidUser: string): Promise<Chat[]> {
    return new Promise((resolve, reject) => {
      ChatService.queryBuilder(uidUser)
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
