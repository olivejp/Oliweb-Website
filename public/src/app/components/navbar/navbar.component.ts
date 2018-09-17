import {Component, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private keyword: string;

  constructor(private router: Router,
              private signInService: SignInService) {
    this.keyword = '';
  }

  ngOnInit() {
  }

  isUserAuth() {
    return this.signInService.isAuth;
  }

  signOut() {
    this.signInService.signOut();
  }

  search() {
    if (this.keyword && this.keyword.length > 0) {
      this.router.navigate(['/search', {keyword: this.keyword}]);
    } else {
      this.router.navigate(['/annonces']);
    }
  }

  getUserName() {
    return this.signInService.getUserAuth().profile;
  }
}
