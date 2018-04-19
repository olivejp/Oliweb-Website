import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../../services/AnnonceService";

@Component({
  selector: 'app-annonce-creation',
  templateUrl: './annonce-creation.component.html',
  styleUrls: ['./annonce-creation.component.scss']
})
export class AnnonceCreationComponent implements OnInit {

  constructor(private annonceService: AnnonceService) { }

  ngOnInit() {
  }

}
