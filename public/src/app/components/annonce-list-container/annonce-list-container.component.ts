import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignInService} from "../../services/SignInService";
import {Annonce} from "../../domain/annonce.model";
import {AnnonceService} from "../../services/AnnonceService";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as firebase from "firebase";
import {SearchRequestService} from "../../services/SearchRequestService";
import {LoadingDialogComponent} from "../loading-dialog/loading-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material";

export interface Source {
  _source: Annonce;
}

@Component({
  selector: 'app-annonce-list-container',
  templateUrl: './annonce-list-container.component.html',
  styleUrls: ['./annonce-list-container.component.scss']
})
export class AnnonceListContainerComponent implements OnInit, OnDestroy {
  annonces: Annonce[];
  annoncesSubscription: Subscription;
  authSubscription: Subscription;
  selectedAnnonce: Annonce;
  isAuth: any;
  isLoading: boolean;
  dialogRef: MatDialogRef<LoadingDialogComponent>;

  constructor(private annonceService: AnnonceService,
              private searchRequestService: SearchRequestService,
              private router: Router,
              private signInService: SignInService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.openDialog();
    this.annoncesSubscription = this.annonceService.annoncesSubject.subscribe(
      (annonces: any[]) => {
        this.isLoading = false;
        this.closeDialog();
        this.annonces = annonces;
      }
    );
    this.authSubscription = this.signInService.authSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    this.annonceService.getAnnonces();
    this.signInService.emitIsAuth();
  }

  openDialog() {
    this.isLoading = true;
    this.dialogRef = this.dialog.open(LoadingDialogComponent, {
      width: 'auto',
      height: 'auto'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeDialog() {
    this.isLoading = false;
    this.dialogRef.close(null);
  }

  ngOnDestroy() {
    this.annoncesSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }

  launchSearch(query: string) {
    this.annonces = [];
    this.openDialog();
    if (query != null && query != undefined && query != '') {
      this.searchRequestService.saveRequest(query)
        .catch(reason => {
          console.error(reason);
          this.closeDialog();
        })
        .then(requestKey => {
          firebase.database().ref('/requests/' + requestKey).on('value', request => {
            if (request.hasChild('no_results') || request.hasChild('results')) {
              if (request.hasChild('results')) {
                let tableau: Source[] = request.child('results').val();
                for (let source of tableau) {
                  let annonce: Annonce = source._source;
                  this.annonces.push(annonce);
                }
              }
              this.closeDialog();
              firebase.database().ref('/requests/' + requestKey).remove().catch(reason => console.error(reason));
            }
          });
        });
    } else {
      this.annonceService.getAnnonces();
      this.closeDialog();
    }
  }
}
