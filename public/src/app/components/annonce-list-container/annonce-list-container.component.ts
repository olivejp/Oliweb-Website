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

@Component({
  selector: 'app-annonce-list-container',
  templateUrl: './annonce-list-container.component.html',
  styleUrls: ['./annonce-list-container.component.scss']
})
export class AnnonceListContainerComponent implements OnInit, OnDestroy {
  annonces: Annonce[];
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
    this.searchRequestService.launchSearch()
      .then(resultEs => {
        this.annonces = [];
        for (let annonceEs of resultEs.hits) {
          this.annonces.push(annonceEs._source);
        }
        this.closeDialog();
      })
      .catch(reason => {
        console.error(reason);
        this.closeDialog();
      });

    this.authSubscription = this.signInService.authSubject.subscribe(
      (auth: boolean) => {
        this.isAuth = auth;
      }
    );
    // this.annonceService.getAnnonces();
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
    this.authSubscription.unsubscribe();
    this.annonceService.setSelectedAnnonce(this.selectedAnnonce);
  }
}
