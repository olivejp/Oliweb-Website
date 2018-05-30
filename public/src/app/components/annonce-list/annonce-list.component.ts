import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Annonce} from "../../domain/annonce.model";

@Component({
  selector: 'app-annonce-list-component',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit, OnDestroy {
  annonces: Annonce[];
  annoncesSubscription: Subscription;
  selectedAnnonce: Annonce;

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit() {
    this.annoncesSubscription = this.annonceService.annoncesSubject.subscribe(
      (annonces: any[]) => {
        this.annonces = annonces;
      }
    );
    this.annonceService.getAnnonces();
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
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }
}
