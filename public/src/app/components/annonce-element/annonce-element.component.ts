import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Annonce} from "../../domain/annonce.model";

@Component({
  selector: 'app-annonce-element',
  templateUrl: './annonce-element.component.html',
  styleUrls: ['./annonce-element.component.scss']
})
export class AnnonceElementComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  annonce: Annonce;

  ngOnInit() {
  }

  getPhotoUrl() {
    return (this.annonce.photos && this.annonce.photos[0].length > 0) ? this.annonce.photos[0] : "assets/test.svg";
  }

  goToDetail() {
    this.router.navigate(["/annonces/view", this.annonce.uuid])
  }
}
