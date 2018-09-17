import {Component, Input, OnInit} from '@angular/core';
import {Annonce} from "../../domain/annonce.model";
import {LoggerService} from "../../services/LoggerService";
import {AnnonceService} from "../../services/AnnonceService";
import {IPagedResults} from "../../shared/interface";

@Component({
  selector: 'app-annonce-list-search',
  templateUrl: './annonce-list-search.component.html',
  styleUrls: ['./annonce-list-search.component.scss']
})
export class AnnonceListSearchComponent implements OnInit {

  @Input() annonces: Annonce[];

  @Input() isLoading: boolean;

  pageSize = 4;
  totalRecords = 0;

  constructor(private annonceService: AnnonceService,
              private logger: LoggerService) {
  }

  ngOnInit() {
    this.getAnnoncesPage(1);
  }

  getAnnoncesPage(page: number) {
    this.annonceService.getAnnoncesPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<Annonce[]>) => {
          this.annonces = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getAnnoncesPage() retrieved annonces for page: ' + page));
  }

  pageChanged(page: number) {
    this.getAnnoncesPage(page);
  }
}
