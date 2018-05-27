import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnnonceService} from "../../services/AnnonceService";
import {Annonce} from "../../domain/annonce.model";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-annonce-element',
  templateUrl: './annonce-element.component.html',
  styleUrls: ['./annonce-element.component.scss']
})
export class AnnonceElementComponent implements OnInit {

  annonceUid: string;

  @Input()
  annonce: Annonce;
  userImgSrc: String;

  constructor(private annonceService: AnnonceService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.annonceUid = this.route.snapshot.params['uid'];
    this.getUserImage();
  }

  getUserImage() {
    this.userService.getUser(this.annonce.utilisateur.uuid)
      .then(user => {
        this.userImgSrc = user.photoUrl;
      })
      .catch()
  }
}
