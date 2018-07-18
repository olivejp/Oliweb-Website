import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import * as firebase from "firebase";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  _mobileQueryListener: MediaQueryListListener;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    const config = {
      apiKey: "AIzaSyBaYYt7PxiZp7NBqphpLyRnrLgDrBMnZHA",
      authDomain: "oliweb-ec245.firebaseapp.com",
      databaseURL: "https://oliweb-ec245.firebaseio.com",
      projectId: "oliweb-ec245",
      storageBucket: "oliweb-ec245.appspot.com",
      messagingSenderId: "826584581733"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
