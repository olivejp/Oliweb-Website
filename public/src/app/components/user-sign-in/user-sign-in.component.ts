import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  authStatus: boolean;

  ngOnInit() {
    this.authStatus = this.userService.isAuth;
  }

  bidule(result: any){

  }

  onSignInGoogle() {
    UserService.signInGoogle().then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.authStatus = true;
      this.router.navigate(['annonces'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignInFacebook() {
    UserService.signInFacebook().then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.authStatus = true;
      this.router.navigate(['annonces'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignOut() {
    UserService.signOut();
    this.authStatus = false;
  }
}
