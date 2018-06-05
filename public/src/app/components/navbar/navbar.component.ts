import {Component, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Subscription} from "rxjs/Subscription";
import {ChatService} from "../../services/ChatService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;
  isAuthSubscription: Subscription;

  chatNumber: number;

  constructor(private signInService: SignInService,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.isAuthSubscription = this.signInService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
        if (this.isAuth) {
          // Recherche des chats pour cette utilisateur
          const uidUser: string = this.signInService.getUserAuth().uid;
          this.chatService.getChatsByUidUser(uidUser)
            .then(value => this.chatNumber = value.length)
            .catch(reason => console.error(reason));
        }
      }
    );
  }

  getUserPhotoUrl(): string {
    if (this.isAuth) {
      return this.signInService.getUserAuth().photoUrl;
    }
  }
}
