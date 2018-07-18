import { Component, OnInit } from '@angular/core';
import {SearchRequestService} from "../../services/SearchRequestService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  query: string;

  constructor(private searchRequestService: SearchRequestService, private router: Router) { }

  ngOnInit() {
    this.query = '';
  }

  sendRequest(){
    this.router.navigate(['/annonces', 'search', this.query]);
  }
}
