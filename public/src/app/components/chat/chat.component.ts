import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../services/ChatService";
import {Chat} from "../../domain/chat.model";
import {SignInService} from "../../services/SignInService";
import {Message} from "../../domain/message.model";
import {MessageService} from "../../services/MessageService";
import {User} from "../../domain/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  queryAnnonceUid: string;
  querySellerUid: string;
  queryBuyerUid: string;

  action: string;
  chats: Chat[];
  selectedChat: Chat;
  messagesFromSelectedChat: Message[];

  buyerFromSelectedChat: User;
  sellerFromSelectedChat: User;

  messageToSend: string;

  subscription: Subscription;
  subscriptionChat: Subscription;
  subscriptionChatDeleted: Subscription;

  constructor(private route: ActivatedRoute,
              private signInService: SignInService,
              private messageService: MessageService,
              private chatService: ChatService) {
  }

  ngOnInit() {

    let userUid = this.signInService.getUserAuth().uid;

    // Recherche de tout les chats de l'utilisateur connecté
    this.chatService.getChatsByUidUser(userUid)
      .then(chatList => this.chats = chatList)
      .catch(reason => console.error(new Error(reason)));

    // Récupération des queryParams dans la route
    this.route.queryParamMap.subscribe(params => {
      this.action = params.get('action');
      this.queryAnnonceUid = params.get('annonceUid');
      this.querySellerUid = params.get('sellerUid');
      this.queryBuyerUid = params.get('buyerUid');

      if (this.action === 'sendMessage') {
        // TODO finir la création d'un nouveau chat.
      }
    });

    // On va écouter les nouveaux chats
    this.subscriptionChat = this.chatService.listenForAddedChatsByUserUid(userUid)
      .subscribe(chatNew => this.chats.push(chatNew));

    // On va écouter les chats supprimés
    this.subscriptionChatDeleted = this.chatService.listenForRemovedChatsByUserUid(userUid)
      .subscribe(chatDeleteUid => {
        let indexToDelete = this.chats.findIndex(chatRead => chatRead.uid === chatDeleteUid);
        this.chats.splice(indexToDelete, 1);
      });
  }

  selectChat(chat: Chat) {
    // Si on a sélectionné un nouveau chat, je me désabonne de l'ancien observeur
    if (this.selectedChat && chat.uid !== this.selectedChat.uid && this.subscription) {
      this.subscription.unsubscribe();
    }

    this.selectedChat = chat;
    this.messagesFromSelectedChat = [];

    // Recherche des messages pour ce chat
    this.messageService.getMessagesByChatUid(chat.uid)
      .then(messages => {
        this.messagesFromSelectedChat = messages;
      })
      .catch(reason => console.error(new Error(reason)));

    // On va écouter les nouveaux messages pour ce chat
    this.subscription = this.messageService.listenForAddedMessagesByChatUid(chat.uid)
      .subscribe(messageNew => this.messagesFromSelectedChat.push(messageNew));
  }

  setBuyer(buyer: User) {
    this.buyerFromSelectedChat = buyer;
  }

  setSeller(seller: User) {
    this.sellerFromSelectedChat = seller;
  }

  sendMessage() {
    if (this.messageToSend && this.messageToSend.length > 0) {
      let message: Message = new Message();
      message.message = this.messageToSend;
      message.uidChat = this.selectedChat.uid;
      message.uidAuthor = this.signInService.getUserAuth().uid;
      message.read = false;
      this.messageService.sendMessage(message)
        .then(value => {
          console.log("Message correctement envoyé");
          this.messageToSend = "";
        })
        .catch(reason => console.error(new Error(reason)));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionChat) {
      this.subscriptionChat.unsubscribe();
    }

    if (this.subscriptionChatDeleted) {
      this.subscriptionChatDeleted.unsubscribe();
    }
  }
}
