import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SignInService} from "../../services/SignInService";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(private signInService: SignInService,
              private userService: UserService,
              private router: Router) {
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

      // TODO enregistrer l'utilisateur ICI
      this.userService.saveUser(user.uid, user.email, user.refreshToken, user.displayName, user.photoURL)
        .then((data) => {
          console.log('Insertion utilisateur dans la base successful')
        });

      this.router.navigate(['annonces'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignInFacebook() {
    SignInService.signInFacebook().then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      this.authStatus = true;

      // TODO enregistrer l'utilisateur ICI

      this.router.navigate(['annonces'])
    }).catch(reason => {
      const errorCode = reason.code;
    });
  }

  onSignOut() {
    SignInService.signOut();
    this.authStatus = false;
  }
}
