import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnnonceService} from "../../services/AnnonceService";
import {Annonce} from "../../domain/annonce.model";

@Component({
  selector: 'app-annonce-element',
  templateUrl: './annonce-element.component.html',
  styleUrls: ['./annonce-element.component.scss']
})
export class AnnonceElementComponent implements OnInit {

  annonceUid: string;

  @Input()
  annonce: Annonce;

  constructor(private annonceService: AnnonceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.annonceUid = this.route.snapshot.params['uid'];
  }
}
