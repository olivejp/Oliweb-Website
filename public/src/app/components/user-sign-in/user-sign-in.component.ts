import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SignInService} from "../../services/SignInService";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(private signInService: SignInService, private router: Router) {
  }

  authStatus: boolean;

  ngOnInit() {
    this.authStatus = this.signInService.isAuth;
  }

  onSignInGoogle() {
    SignInService.signInGoogle().then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.authStatus = true;
      this.router.navigate(['user'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignInFacebook() {
    SignInService.signInFacebook().then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.authStatus = true;
      this.router.navigate(['user'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignOut() {
    SignInService.signOut();
    this.authStatus = false;
  }
}
