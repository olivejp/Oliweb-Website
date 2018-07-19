import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Annonce} from "../../domain/annonce.model";
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as firebase from "firebase";
import {SearchRequestService} from "../../services/SearchRequestService";

export interface Source {
  _source: Annonce;
}

@Component({
  selector: 'app-annonce-list-container',
  templateUrl: './annonce-list-container.component.html',
  styleUrls: ['./annonce-list-container.component.scss']
})
export class AnnonceListContainerComponent implements OnInit, OnDestroy {
  annonces: Annonce[];
  annoncesSubscription: Subscription;
  authSubscription: Subscription;
  selectedAnnonce: Annonce;
  screenHeight: number;
  screenWidth: number;
  colsNumber: number;
  isAuth: any;

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

  constructor(private annonceService: AnnonceService,
              private searchRequestService: SearchRequestService,
              private router: Router,
              private signInService: SignInService) {
    this.onResize();
  }

  ngOnInit() {
    this.annoncesSubscription = this.annonceService.annoncesSubject.subscribe(
      (annonces: any[]) => {
        this.annonces = annonces;
      }
    );
    this.authSubscription = this.signInService.authSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    this.annonceService.getAnnonces();
    this.signInService.emitIsAuth();
  }

  onNewAnnonce() {
    this.router.navigate(['/annonces', 'new']);
  }

  ngOnDestroy() {
    this.annoncesSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }

  launchSearch(query: string) {
    this.annonces = [];
    if (query != null && query != undefined && query != '') {
      let requestKey = this.searchRequestService.saveRequest(1, 25, query, 'ASC');

      console.debug(requestKey);

      firebase.database().ref('/requests/' + requestKey).on('value', request => {
        if (request.hasChild('no_results') || request.hasChild('results')) {

          if (request.hasChild('results')) {
            let tableau: Source[] = request.child('results').val();
            for (let source of tableau) {
              let annonce: Annonce = source._source;
              this.annonces.push(annonce);
            }
          }

          firebase.database().ref('/requests/' + requestKey).remove();
        }
      });
    } else {
      this.annonceService.getAnnonces();
    }
  }
}
