import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AnnonceService} from "../../services/AnnonceService";
import {Annonce} from "../../domain/annonce.model";
import {UserService} from "../../services/UserService";
import {ActivatedRoute, Router} from "@angular/router";
import {SignInService} from "../../services/SignInService";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.scss']
})
export class AnnonceDetailComponent implements OnInit {

  annonceUid: string;
  annonce: Annonce;
  userImgSrc: String;
  uidUserParrain: string;

  constructor(private router: Router,
              private annonceService: AnnonceService,
              private userService: UserService,
              private route: ActivatedRoute,
              private signInService: SignInService,
              private location: Location) {
  }

  ngOnInit() {
    this.route.queryParams.forEach(value => {
      if (value.hasOwnProperty("from")) {
        this.uidUserParrain = value.from;
      }
    });

    this.annonceUid = this.route.snapshot.params['uid'];

    this.annonceService.getSingleAnnonce(this.annonceUid).then(value => {
      this.annonce = value;
      this.getUserImage();
    });
  }

  getUserImage() {
    if (this.annonce && this.annonce.utilisateur) {
      this.userService.getUser(this.annonce.utilisateur.uuid)
        .then(user => {
          this.userImgSrc = user.photoUrl;
        })
        .catch()
    }
  }

  onBackPressed() {
    this.location.back();
  }

  sendEmail() {
    window.open('mailto:' + this.annonce.utilisateur.email + '?subject=' + this.annonce.titre + '&body=Votre annonce m\'intéresse');
  }

  goToChat() {
    if (this.signInService.isAuth) {
      this.router.navigate(['/chat'], {
        queryParams: {
          action: 'sendMessage',
          annonceUid: this.annonce.uuid,
          sellerUid: this.annonce.utilisateur.uuid,
          buyerUid: this.signInService.getUserAuth().uid
        }
      });
    } else {
      this.router.navigate(['/login'])
    }
  }
}
