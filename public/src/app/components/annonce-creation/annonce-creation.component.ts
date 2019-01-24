import {Component, OnInit} from '@angular/core';
import {AnnonceService} from '../../services/AnnonceService';
import {Annonce, UtilisateurEmbeded} from '../../domain/annonce.model';
import {CategorieService} from '../../services/CategorieService';
import {Categorie} from '../../domain/categorie.model';
import {SignInService} from '../../services/SignInService';
import {User} from '../../domain/user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit {

  categorieSelected: Categorie;
  annonce: Annonce;
  erreur: String;
  contactEmail: boolean;
  contactTel: boolean;
  contactMsg: boolean;

  categories: Categorie[];

  constructor(private annonceService: AnnonceService,
              private categorieService: CategorieService,
              private signInService: SignInService,
              private router: Router) {
  }

  ngOnInit() {
    this.annonce = new Annonce();
    this.annonce.contactTel = false;
    this.annonce.contactMsg = false;
    this.annonce.contactEmail = false;
    this.annonce.photos = [];

    this.categorieService.getAllCategories().then((categories) => {
      this.categories = categories;
    });
  }

  convertUser(user: User): UtilisateurEmbeded {
    const utilisateur = new UtilisateurEmbeded();
    utilisateur.profile = user.profile;
    utilisateur.uuid = user.uid;
    utilisateur.email = user.email;
    utilisateur.telephone = '';
    return utilisateur;
  }

  saveAnnonce() {
    if (!this.signInService.isAuth) {
      this.erreur = 'Impossible d\'envoyer des annonces sans être authentifié';
      console.log('Impossible d\'envoyer des annonces sans être authentifié');
      return;
    }

    if (!this.categorieSelected) {
      this.erreur = 'Une catégorie est nécessaire';
      return;
    }

    if (!this.annonce.titre || this.annonce.titre.length == 0) {
      this.erreur = 'Un titre est nécessaire';
      return;
    }

    if (!this.annonce.description) {
      this.erreur = 'Une description est nécessaire';
      return;
    }

    if (!this.annonce.prix) {
      this.erreur = 'Un prix est nécessaire';
      return;
    }

    if (!this.annonce.contactEmail && !this.annonce.contactTel && !this.annonce.contactMsg) {
      this.erreur = 'Un moyen de contact est nécessaire';
      return;
    }

    this.annonce.utilisateur = this.convertUser(this.signInService.getUserAuth());
    this.annonce.categorie = this.categorieSelected;
    this.annonceService.saveAnnonce(this.annonce)
      .then((data) => {
        this.router.navigate(['annonces']);
      })
      .catch((reason) => {
        this.erreur = reason.message;
      });
  }

  onChangeContactTel() {
    this.annonce.contactTel = !this.annonce.contactTel;
  }

  onChangeContactMsg() {
    this.annonce.contactMsg = !this.annonce.contactMsg;
  }

  onChangeContactEmail() {
    this.annonce.contactEmail = !this.annonce.contactEmail;
  }

  goBack() {
    window.history.back();
  }

  setCategorie(categorie: Categorie) {
    this.categorieSelected = categorie;
  };
}
