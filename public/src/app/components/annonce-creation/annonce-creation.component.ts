import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";
import {Annonce} from "../../domain/annonce.model";
import {CategorieService} from "../../services/CategorieService";
import {Categorie} from "../../domain/categorie.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit {

  annonce: Annonce;
  erreur: String;
  contactEmail: boolean;
  contactTel: boolean;
  contactMsg: boolean;

  categories: Categorie[];

  constructor(private annonceService: AnnonceService,
              private categorieService: CategorieService) {
  }

  ngOnInit() {
    this.annonce = new Annonce();
    this.annonce.photos = [];
    this.contactEmail = true;
    this.contactTel = true;
    this.contactMsg = true;

    this.categorieService.getAllCategories().then((categories) => {
      this.categories = categories;
    });
  }


  saveAnnonce() {
    this.annonce.contactMsg = this.contactMsg;
    this.annonce.contactTel = this.contactTel;
    this.annonce.contactEmail = this.contactEmail;
    this.annonceService.saveAnnonce(this.annonce)
      .then((data) => {
        this.erreur = "Tout s'est bien passé";
      })
      .catch((reason) => {
        this.erreur = reason.message;
      });
  }

  onChangeContactTel() {
    this.contactTel = !this.contactTel;
  }

  onChangeContactMsg() {
    this.contactMsg = !this.contactMsg;
  }

  onChangeContactEmail() {
    this.contactEmail = !this.contactEmail;
  }
}
