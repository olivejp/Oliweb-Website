import {Component, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;
  isAuthSubscription: Subscription;

  constructor(private signInService: SignInService) {
  }

  ngOnInit() {
    this.isAuthSubscription = this.signInService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
  }

  getUserPhotoUrl(): string {
    if (this.isAuth) {
      return this.signInService.getUserAuth().photoUrl;
    }
  }
}
