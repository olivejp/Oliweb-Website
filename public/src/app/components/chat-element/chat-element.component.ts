import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../domain/chat.model";
import {UserService} from "../../services/UserService";
import {SignInService} from "../../services/SignInService";

@Component({
  selector: 'app-chat-element',
  templateUrl: './chat-element.component.html',
  styleUrls: ['./chat-element.component.scss']
})
export class ChatElementComponent implements OnInit {

  @Input()
  chat: Chat;

  @Output()
  chatSelected = new EventEmitter<Chat>();

  chatUpdateDate: Date;

  urlPhoto: string;

  constructor(private signInService: SignInService,
              private userService: UserService) {
  }

  ngOnInit() {
    // Conversion du timestamp en date
    this.chatUpdateDate = new Date(this.chat.updateTimestamp);

    // recherche de l'url photo du correspondant
    let uidUser = this.signInService.getUserAuth().uid;
    this.userService.getUser((uidUser === this.chat.uidBuyer) ? this.chat.uidSeller : this.chat.uidBuyer)
      .then(user => {
        this.urlPhoto = user.photoUrl;
      })
      .catch(reason => console.error(new Error(reason)));
  }

  selectChat() {
    this.chatSelected.emit(this.chat);
  }
}
