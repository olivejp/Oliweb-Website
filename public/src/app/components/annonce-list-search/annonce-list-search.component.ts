import {Component, HostListener, Input} from '@angular/core';
import {Annonce} from "../../domain/annonce.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonce-list-search',
  templateUrl: './annonce-list-search.component.html',
  styleUrls: ['./annonce-list-search.component.scss']
})
export class AnnonceListSearchComponent {

  @Input() annoncesListSearch: Annonce[];

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

  constructor(private router: Router) {
    this.onResize();
  }

  onViewAnnonce(index: number) {
    this.router.navigate(['/annonces', 'view', this.annoncesListSearch[index].uuid]);
  }
}
