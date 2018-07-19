import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  query: string;

  @Output() searchClicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    this.query = '';
  }

  searchHasBeenClicked() {
    this.searchClicked.emit(this.query);
  }
}
