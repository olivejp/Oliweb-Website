import {Annonce} from "../../domain/annonce.model";
import {UserService} from "../../services/UserService";
import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonce-element',
  templateUrl: './annonce-element.component.html',
  styleUrls: ['./annonce-element.component.scss']
})
export class AnnonceElementComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  @Input()
  annonce: Annonce;

  userPhotoUrl: string;

  ngOnInit() {
    this.getPhotoVendeurUrl();
  }

  isPhotoPresent() {
    return this.annonce.photos && this.annonce.photos[0].length > 0;
  }

  getPhotoUrl() {
    return (this.isPhotoPresent()) ? this.annonce.photos[0] : "assets/icon.png";
  }

  goToDetail() {
    this.router.navigate(["/annonces/view", this.annonce.uuid])
  }

  getPhotoVendeurUrl() {
    this.userService.getUser(this.annonce.utilisateur.uuid)
      .then(user => this.userPhotoUrl = user.photoUrl)
      .catch(reason => console.error(reason));
  }
}
