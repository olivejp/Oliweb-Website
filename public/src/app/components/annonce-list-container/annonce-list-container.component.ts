import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Annonce} from "../../domain/annonce.model";
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {SearchRequestService} from "../../services/SearchRequestService";

@Component({
  selector: 'app-annonce-list-container',
  templateUrl: './annonce-list-container.component.html',
  styleUrls: ['./annonce-list-container.component.scss']
})
export class AnnonceListContainerComponent implements OnInit, OnDestroy {
  annonces: Annonce[];
  authSubscription: Subscription;
  selectedAnnonce: Annonce;
  isAuth: any;
  isLoading: boolean;

  constructor(private annonceService: AnnonceService,
              private searchRequestService: SearchRequestService,
              private router: Router,
              private signInService: SignInService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.openDialog();

    this.annonces = [];

    // On lance la première recherche
    this.searchRequestService.launchSearch()
      .then(resultEs => {
        for (let annonceEs of resultEs.hits) {
          this.annonces.push(annonceEs._source);
        }
        this.closeDialog();
      })
      .catch(reason => {
        console.error(reason);
        this.closeDialog();
      });

    this.authSubscription = this.signInService.authSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    // this.annonceService.getAnnonces();
    this.signInService.emitIsAuth();
  }

  openDialog() {
    this.isLoading = true;
  }

  closeDialog() {
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }
}
