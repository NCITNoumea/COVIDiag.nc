import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'covidiagnc-app-root',
  templateUrl: './covidiagnc-app.component.html',
  styleUrls: ['./covidiagnc-app.component.scss']
})
export class CovidiagAppComponent {
  title = 'COVIDiag.nc';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAgcqN_DWKXnOqJpTk_kN202jPBOJU8zrU",
      authDomain: "covidiagnc.firebaseapp.com",
      databaseURL: "https://covidiagnc.firebaseio.com",
      projectId: "covidiagnc",
      storageBucket: "",
      messagingSenderId: "38239985711",
      appId: "1:38239985711:web:4901790a5b8d9328"
    };

    firebase.initializeApp(firebaseConfig);
  }

}
