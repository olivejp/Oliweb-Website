import {Component, OnInit} from '@angular/core';
import {AnnonceService} from '../../services/AnnonceService';
import {Annonce, UtilisateurEmbeded} from '../../domain/annonce.model';
import {CategorieService} from '../../services/CategorieService';
import {Categorie} from '../../domain/categorie.model';
import {SignInService} from '../../services/SignInService';
import {User} from '../../domain/user.model';
import {MatSnackBar} from '@angular/material';
import {Router} from "@angular/router";

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
              private categorieService: CategorieService,
              private signInService: SignInService,
              public snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.annonce = new Annonce('', '', '');
    this.annonce.photos = [];
    this.contactEmail = true;
    this.contactTel = true;
    this.contactMsg = true;

    this.categorieService.getAllCategories().then((categories) => {
      this.categories = categories;
    });
  }

  convertUser(user
                :
                User
  ):
    UtilisateurEmbeded {
    const utilisateur = new UtilisateurEmbeded();
    utilisateur.profile = user.profile;
    utilisateur.uuid = user.uid;
    utilisateur.email = user.email;
    utilisateur.telephone = '';
    return utilisateur;
  }

  saveAnnonce() {
    if (this.signInService.isAuth) {
      this.annonce.utilisateur = this.convertUser(this.signInService.getUserAuth());
      this.annonce.contactMsg = this.contactMsg;
      this.annonce.contactTel = this.contactTel;
      this.annonce.contactEmail = this.contactEmail;
      this.annonceService.saveAnnonce(this.annonce)
        .then((data) => {
          this.snackBar.open('SAUVEGARDE RÉUSSI', '', {
            duration: 2000,
          });
        })
        .catch((reason) => {
          this.snackBar.open('SAUVEGARDE ÉCHOUÉE', '', {
            duration: 2000,
          });
          this.erreur = reason.message;
        });
    } else {
      console.log('Impossible d\'envoyer des annonces sans être authentifié');
    }
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
