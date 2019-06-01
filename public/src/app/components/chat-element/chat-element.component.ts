import {Chat} from "../../domain/chat.model";
import {UserService} from "../../services/UserService";
import {SignInService} from "../../services/SignInService";
import {User} from "../../domain/user.model";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrls: ['./chat-element.component.scss']
})
export class ChatElementComponent implements OnInit {

  @Input()
  selectedChat: Chat;

  @Input()
  chat: Chat;

  @Output()
  chatSelected = new EventEmitter<Chat>();

  @Output()
  buyer = new EventEmitter<User>();

  @Output()
  seller = new EventEmitter<User>();

  chatUpdateDate: Date;

  urlPhoto: string;

  constructor(private signInService: SignInService,
              private userService: UserService) {
  }

  ngOnInit() {
    // Conversion du timestamp en date
    this.chatUpdateDate = new Date(this.chat.updateTimestamp);

    // recherche de l'url photo du correspondant
    this.userService.getUser((this.signInService.getUserAuth().uid === this.chat.uidBuyer) ? this.chat.uidSeller : this.chat.uidBuyer)
      .then(user => {
        this.urlPhoto = user.photoUrl;
      })
      .catch(reason => console.error(new Error(reason)));
  }

  selectChat() {
    this.chatSelected.emit(this.chat);

    // recherche de l'acheteur
    this.userService.getUser(this.chat.uidBuyer)
      .then(user => {
        this.buyer.emit(user);
      })
      .catch(reason => console.error(new Error(reason)));

    // recherche du vendeur
    this.userService.getUser(this.chat.uidSeller)
      .then(user => this.seller.emit(user))
      .catch(reason => console.error(new Error(reason)));
  }
}
