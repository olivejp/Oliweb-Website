import {Component, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";
import {Annonce} from "../../domain/annonce.model";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit {

  annonce: Annonce;
  erreur: String;

  constructor(private annonceService: AnnonceService) {
  }

  ngOnInit() {
    this.annonce = new Annonce();
  }

  saveAnnonce() {
    AnnonceService.saveAnnonce(this.annonce)
      .then((data) => {
        this.erreur = "Tout s'est bien passé";
      })
      .catch((reason) => {
        this.erreur = reason.message;
      });
  }
}
