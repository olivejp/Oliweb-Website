import {Component, HostListener, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Annonce} from "../../domain/annonce.model";
import {AnnonceService} from "../../services/AnnonceService";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {SearchRequestService} from "../../services/SearchRequestService";
import * as firebase from "firebase";
import {logger} from "codelyzer/util/logger";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-annonce-list-search',
  templateUrl: './annonce-list-search.component.html',
  styleUrls: ['./annonce-list-search.component.scss']
})
export class AnnonceListSearchComponent implements OnInit {
  annonces: Annonce[];
  query: string;

  screenHeight: number;
  screenWidth: number;
  colsNumber: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this.colsNumber = 1;

    if (this.screenWidth > 768) {
      this.colsNumber = 3;
    }
    if (this.screenWidth > 1024) {
      this.colsNumber = 4;
    }
  }

  constructor(private searchRequestService: SearchRequestService, private route: ActivatedRoute) {
    this.onResize();
  }

  ngOnInit() {
    // Récupération du paramètre donné dans l'URL
    this.query = this.route.snapshot.params['query'];
    this.search();
  }

  onViewAnnonce(index: number) {
    this.selectedAnnonce = this.annonces[index];
    this.router.navigate(['/annonces', 'view', this.annonces[index].uuid]);
  }

  search() {
    this.annonces = [];

    // Ecoute de la requête pour attendre son retour
    let requestKey = this.searchRequestService.saveRequest(1, 25, this.query, 'ASC');

    console.debug(requestKey);

    firebase.database().ref('/requests/' + requestKey).on('value', request => {
      if (request.hasChild('no_results') || request.hasChild('results')) {

        if (request.hasChild('results')) {
          let tableau: Object[] = request.child('results').val();
          for (let source of tableau) {
            let annonce: Annonce = source._source;
            this.annonces.push(annonce);
          }
        }

        firebase.database().ref('/requests/' + requestKey).remove();
      }
    })
  }
}
