import {Component, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Router} from "@angular/router";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private keyword: string;

  constructor(private router: Router,
              private signInService: SignInService,
              private userService: UserService) {
    this.keyword = '';
  }

  ngOnInit() {
  }

  isUserAuth() {
    // return true;
    return this.signInService.isAuth;
  }

  signOut() {
    this.signInService.signOut();
  }

  search() {
    if (this.keyword && this.keyword.length > 0) {
      this.router.navigate(['/annonces/search', this.keyword]);
    } else {
      this.router.navigate(['/annonces']);
    }
  }

  getUserName() {
    return (this.signInService.isAuth) ? this.signInService.getUserAuth().profile : null;
  }

  getPhotoVendeurUrl() {
    return this.signInService.isAuth ? this.signInService.getUserAuth().photoUrl : null;
  }
}
