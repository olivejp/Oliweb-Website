import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from '../../services/AnnonceService';
import {Annonce, UtilisateurEmbeded} from '../../domain/annonce.model';
import {CategorieService} from '../../services/CategorieService';
import {Categorie} from '../../domain/categorie.model';
import {SignInService} from '../../services/SignInService';
import {User} from '../../domain/user.model';
import {Router} from "@angular/router";
import {PhotoService} from "../../services/PhotoService";
import {FirebaseUtilityService} from "../../services/FirebaseUtilityService";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit, OnDestroy {

  categorieSelected: Categorie;
  annonce: Annonce;
  erreur: String;
  contactEmail: boolean;
  contactTel: boolean;
  contactMsg: boolean;
  isUploading: boolean;
  selectedFile: File;
  hasBeenSend: boolean;
  photoUrlToDelete: string;

  categories: Categorie[];

  constructor(private annonceService: AnnonceService,
              private categorieService: CategorieService,
              private signInService: SignInService,
              private router: Router,
              private photoService: PhotoService,
              private firebaseUtilityService: FirebaseUtilityService) {
  }

  ngOnInit() {
    this.hasBeenSend = false;
    this.annonce = new Annonce();
    this.annonce.uuid = this.annonceService.getNewUid();
    this.annonce.contactTel = false;
    this.annonce.contactMsg = false;
    this.annonce.contactEmail = false;
    this.annonce.datePublication = -1;
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
    utilisateur.photoUrl = user.photoUrl;
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
        this.hasBeenSend = true;
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    this.isUploading = true;
    this.photoService.uploadImage(this.selectedFile, this.signInService.getUserAuth(), this.annonce)
      .then(uploadTaskSnapshot => {
        this.annonce.photos.push(uploadTaskSnapshot.downloadURL);
        this.isUploading = false;
      })
      .catch(reason => {
        console.error(reason);
        this.isUploading = false;
      });
  }

  ngOnDestroy(): void {
    // Le composant a été détruit sans que l'annonce n'ait été envoyée
    if (!this.hasBeenSend && this.annonce.photos && this.annonce.photos.length > 0) {

      // On veut donc supprimer les images qui ont été stockées sur notre serveur pour rien.
      for (let photoUrl of this.annonce.photos) {
        let fileName = this.firebaseUtilityService.getFilename(photoUrl);
        this.photoService.deleteFile(fileName)
          .then(value => console.log('Fichier bien supprimé'))
          .catch(reason => console.error(reason));
      }
    }
  }

  selectPhotoToDelete(photoUrlToDelete: string){
    this.photoUrlToDelete = photoUrlToDelete;
  }

  deletePhoto(){
    const fileName = this.firebaseUtilityService.getFilename(this.photoUrlToDelete);
    this.photoService.deleteFile(fileName)
      .then(value => {
        let indexOf = this.annonce.photos.indexOf(this.photoUrlToDelete);
        this.annonce.photos.splice(indexOf, 1);
        this.photoUrlToDelete = '';
        console.log('Fichier bien supprimé');
      })
      .catch(reason => {
        this.photoUrlToDelete = '';
        console.error(reason)
      });
  }
}
