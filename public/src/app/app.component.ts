import {Component} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyBaYYt7PxiZp7NBqphpLyRnrLgDrBMnZHA-6qertew4',
      authDomain: 'oliweb-ec245.firebaseapp.com',
      databaseURL: 'https://oliweb-ec245.firebaseio.com',
      projectId: 'oliweb-ec245',
      storageBucket: 'gs://oliweb-ec245.appspot.com',
      messagingSenderId: '826584581733'
    };
    firebase.initializeApp(config);
  }
}
