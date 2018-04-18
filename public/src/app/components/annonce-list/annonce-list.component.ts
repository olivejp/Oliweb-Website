import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-annonce-list-component',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit, OnDestroy {
  annonces: any[];
  annoncesSubscription: Subscription;
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

  onViewBook(id: number) {
    this.router.navigate(['/annonces', 'view', id]);
  }

  ngOnDestroy() {
    this.annoncesSubscription.unsubscribe();
  }
}
