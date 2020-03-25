import { Component } from '@angular/core';

import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
//import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'covidiagnc-app-root',
  templateUrl: './covidiagnc-app.component.html',
  styleUrls: ['./covidiagnc-app.component.scss']
})
export class CovidiagAppComponent {
  title = 'COVIDiag.nc';

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}

const firebaseConfig = {
  apiKey: "AIzaSyDtM0XbR0xPW7HIgoxPiQT0rlOINoisRO0",
  authDomain: "covidiagnc.firebaseapp.com",
  databaseURL: "https://covidiagnc.firebaseio.com",
  projectId: "covidiagnc",
  storageBucket: "covidiagnc.appspot.com",
  messagingSenderId: "208509516335",
  appId: "1:208509516335:web:cff4c42c5d168b2ea5a4da",
  measurementId: "G-3V28DV5CCC"
};
