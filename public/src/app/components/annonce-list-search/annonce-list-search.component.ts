import {Component, Input, OnInit} from '@angular/core';
import {Annonce} from "../../domain/annonce.model";
import {LoggerService} from "../../services/LoggerService";
import {AnnonceService} from "../../services/AnnonceService";
import {IPagedResults} from "../../shared/interface";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchRequestService} from "../../services/SearchRequestService";

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
              private logger: LoggerService,
              private searchService: SearchRequestService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      let keyword = paramMap.get('keyword');
      this.annonces = [];
      this.launchSearch(keyword);
    })
  }

  launchSearch(keyword: string) {
    this.searchService.launchSearch(keyword)
      .then(resultEs => {
        for (let annonceEs of resultEs.hits) {
          this.annonces.push(annonceEs._source);
        }
        this.isLoading = false;
      })
      .catch(reason => {
        console.error(reason);
        this.isLoading = false;
      });
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
