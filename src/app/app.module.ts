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
import { faSearch, faInfoCircle, faExclamationTriangle, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ToastrModule } from 'ngx-toastr'

import { CovidiagAppComponent } from './covidiagnc-app.component';

import {
  NavbarComponent,
  Error404Component,
  SearchBarComponent
} from './shared/index';

import { HomeComponent } from './home/home.component';
import { UsefullLinksComponent } from './home/usefull-links/usefull-links.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { SearchDiagnosticComponent } from './search-diagnostic/search-diagnostic.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './shared/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RecommendationComponent } from './diagnostic/recommendation/recommendation.component';
import { DiagnosticResultComponent } from './diagnostic-result/diagnostic-result.component';
import { ParacetamolOnlyComponent } from './shared/paracetamol-only/paracetamol-only.component';

@NgModule({
  declarations: [
    CovidiagAppComponent,
    HomeComponent,
    NavbarComponent,
    Error404Component,
    SearchBarComponent,
    DiagnosticComponent,
    UsefullLinksComponent,
    SearchDiagnosticComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    RecommendationComponent,
    DiagnosticResultComponent,
    ParacetamolOnlyComponent
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
    library.add(faSearch, faInfoCircle, faExclamationTriangle, faArrowRight, faArrowLeft);

    // Connexion au serveur GraphQL
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
