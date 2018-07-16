import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Subscription} from "rxjs/Subscription";
import {ChatService} from "../../services/ChatService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleClicked = new EventEmitter<>();

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
          this.chatService.getChatsByUidUser(this.signInService.getUserAuth().uid)
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

  getUserProfile(): string {
    if (this.isAuth) {
      return this.signInService.getUserAuth().profile;
    }
  }

  toggleSideNav() {
    this.toggleClicked.emit(null);
  }
}
