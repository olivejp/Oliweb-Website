import {SignInService} from "../../services/SignInService";
import {UserService} from "../../services/UserService";
import {ChatService} from "../../services/ChatService";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(private signInService: SignInService,
              private userService: UserService,
              private chatService: ChatService,
              private router: Router) {
  }

  authStatus: boolean;

  ngOnInit() {
    this.authStatus = this.signInService.isAuth;
  }

  getOrCreateUser(user: any) {
    // Recherche si l'utilisateur existe déjà
    this.userService.getUser(user.uid)
      .then((userRead) => {
        this.signInService.setUserAuth(userRead);
        this.router.navigate(['annonces']);
      })
      .catch((reason) => {
        // Si l'utilisateur n'existe pas, je le créé
        this.userService.saveUser(user.uid, user.email, user.refreshToken, user.displayName, user.photoURL)
          .then((userSaved) => {
            console.log('Insertion utilisateur dans la base successful');
            this.signInService.setUserAuth(userSaved);
            this.router.navigate(['annonces']);
          })
          .catch(reason2 => console.error(reason2));
      });
  }

  onSignInGoogle() {
    this.signInService.signInGoogle()
      .then((result: UserCredential) => {
        const user = result.user;
        this.authStatus = true;
        this.getOrCreateUser(user);
      })
      .catch(reason => {
        const errorCode = reason.code;
        console.error(errorCode);
      });
  }

  onSignInFacebook() {
    this.signInService.signInFacebook()
      .then((result: UserCredential) => {
        const user = result.user;
        this.authStatus = true;
        this.getOrCreateUser(user);
      })
      .catch(reason => {
        const errorCode = reason.code;
        console.error(errorCode);
      });
  }

  onSignOut() {
    this.signInService.signOut();
    this.authStatus = false;
  }
}
