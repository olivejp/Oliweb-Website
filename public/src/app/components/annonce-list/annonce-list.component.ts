import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Annonce} from "../../domain/annonce.model";
import {HostListener} from "@angular/core";
import {SignInService} from "../../services/SignInService";

@Component({
  selector: 'app-annonce-list-component',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit, OnDestroy {
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
      this.colsNumber = 2;
    }
    if (this.screenWidth > 1024) {
      this.colsNumber = 3;
    }
  }

  constructor(private annonceService: AnnonceService, private router: Router, private signInService: SignInService) {
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

  onViewAnnonce(index: number) {
    this.selectedAnnonce = this.annonces[index];
    this.router.navigate(['/annonces', 'view', this.annonces[index].uuid]);
  }

  ngOnDestroy() {
    this.annoncesSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }
}
