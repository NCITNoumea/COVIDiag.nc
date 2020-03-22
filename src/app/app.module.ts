import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { appRoutes } from "src/routes";
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ToastrModule } from 'ngx-toastr'

import { CovidiagAppComponent } from './covidiagnc-app.component';
import { HomeComponent } from './home/home.component';

import {
  NavbarComponent,
  Error404Component,
  SearchBarComponent
} from './shared/index';

@NgModule({
  declarations: [
    CovidiagAppComponent,
    HomeComponent,
    NavbarComponent,
    Error404Component,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    //DiagService
  ],
  bootstrap: [CovidiagAppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // Ajout des composants icones Font-Awesome utilisés
    library.add(faSearch);

    // Connexion au serveur GraphQL
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
