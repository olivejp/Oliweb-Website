import {ChatService} from "../../services/ChatService";
import {Chat} from "../../domain/chat.model";
import {SignInService} from "../../services/SignInService";
import {Message} from "../../domain/message.model";
import {MessageService} from "../../services/MessageService";
import {User} from "../../domain/user.model";
import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  queryAnnonceUid: string;
  querySellerUid: string;
  queryBuyerUid: string;
  queryTitreAnnonce: string;

  action: string;
  chats: Chat[];
  selectedChat: Chat;
  messagesFromSelectedChat: Message[];

  buyerFromSelectedChat: User;
  sellerFromSelectedChat: User;

  messageToSend: string;

  shouldCreateChatBeforeSendMessage: boolean;

  subscription: Subscription;
  subscriptionChat: Subscription;
  subscriptionChatDeleted: Subscription;

  constructor(private route: ActivatedRoute,
              private signInService: SignInService,
              private messageService: MessageService,
              private chatService: ChatService) {
  }

  getAllQueryParams(params: ParamMap) {
    this.action = params.get('action');
    this.queryAnnonceUid = params.get('annonceUid');
    this.querySellerUid = params.get('sellerUid');
    this.queryBuyerUid = params.get('buyerUid');
    this.queryTitreAnnonce = params.get('titreAnnonce');
  }

  createNewChat(): Chat {
    // On créé un nouveau chat
    let members = {
      [this.querySellerUid]: true,
      [this.queryBuyerUid]: true
    };

    return new Chat(null,
      this.queryBuyerUid,
      this.querySellerUid,
      this.queryAnnonceUid,
      null,
      this.queryTitreAnnonce,
      null,
      null,
      members
    );
  }

  ngOnInit() {

    let userUid = this.signInService.getUserAuth().uid;

    // Par défaut on a pas besoin de créer un chat
    this.shouldCreateChatBeforeSendMessage = false;

    // Recherche de tout les chats de l'utilisateur connecté
    this.chatService.getChatsByUidUser(userUid)
      .then(chatList => this.chats = chatList)
      .catch(reason => console.error(new Error(reason)));

    // Récupération des queryParams dans la route
    this.route.queryParamMap.subscribe(params => {

        this.getAllQueryParams(params);

        if (this.action === 'sendMessage') {
          // 1 - Rechercher si ce chat n'existe pas déjà
          this.chatService.getChatsByUidUser(this.signInService.getUserAuth().uid)
            .then(chatList => {

                let chatFound: boolean = false;

                // We try to find the corresponding chat
                for (let chat of chatList) {
                  // Si pour cette annonce, pour cet acheteur et pour ce vendeur on a un chat, alors c'est le bon.
                  if (chat.uidAnnonce === this.queryAnnonceUid && chat.uidBuyer === this.queryBuyerUid && chat.uidSeller === this.querySellerUid) {
                    this.selectedChat = chat;
                    chatFound = true;
                    break;
                  }
                }

                // we don't found the corresponding chat, so we will create one
                if (!chatFound) {
                  // Il faudra créer un nouveau chat, qu'on enregistrera que si on envoie un message
                  this.shouldCreateChatBeforeSendMessage = true;
                  this.selectedChat = this.createNewChat();

                  // On le rajoute dans les chats disponible
                  this.chats.push(this.selectedChat);
                }
              }
            )
            .catch(reason => console.error(new Error(reason)));
        }
      }
    );

    // On va écouter les nouveaux chats
    this.subscriptionChat = this.chatService.listenForAddedChatsByUserUid(userUid)
      .subscribe(chatNew => {
        if (this.chats) this.chats.push(chatNew);
      })
    ;

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
      if (this.shouldCreateChatBeforeSendMessage) {
        this.selectedChat.lastMessage = this.messageToSend;
        this.chatService.createChat(this.selectedChat)
          .then(chatSaved => {
            this.selectedChat = chatSaved;
            this.shouldCreateChatBeforeSendMessage = false;
            this.buildAndSendMessage();
          })
          .catch(reason => console.error(new Error(reason)))
      } else {
        this.buildAndSendMessage()
      }
    }
  }

  buildAndSendMessage() {
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
