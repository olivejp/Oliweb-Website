import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {extractStyleParams} from "@angular/animations/browser/src/util";
import {ChatService} from "../../services/ChatService";
import {Chat} from "../../domain/chat.model";
import {SignInService} from "../../services/SignInService";
import {Message} from "../../domain/message.model";
import {MessageService} from "../../services/MessageService";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  annonceUid: string;
  sellerUid: string;
  buyerUid: string;
  chats: Chat[];
  selectedChat: Chat;
  messages: Message[];

  constructor(private route: ActivatedRoute,
              private signInService: SignInService,
              private messageService: MessageService,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.annonceUid = params.get('annonceUid');
      this.sellerUid = params.get('sellerUid');
      this.buyerUid = params.get('buyerUid');

      // Recherche de tout les chats de l'utilisateur connecté
      this.chatService.getChatsByUidUser(this.signInService.getUserAuth().uid)
        .then(chatList => {
          this.chats = chatList;

          // On ne peut pas faire un chat avec soi-même.
          if (this.sellerUid !== this.buyerUid) {

          }
        })
        .catch(reason => console.error(new Error(reason)));
    });
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    this.messages = [];

    // Recherche des messages pour ce chat
    this.messageService.getMessagesByChatUid(chat.uid)
      .then(messages => {
        this.messages = messages;
      })
      .catch(reason => console.error(new Error(reason)))
  }
}
