import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { appRoutes } from "src/routes";
import { HttpClientModule } from "@angular/common/http";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faInfoCircle,
  faExclamationTriangle,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import { ToastrModule } from "ngx-toastr";

import { CovidiagAppComponent } from "./covidiagnc-app.component";

import {
  NavbarComponent,
  Error404Component,
  SearchBarComponent
} from "./shared/index";

import { HomeComponent } from "./home/home.component";
import { UsefullLinksComponent } from "./home/usefull-links/usefull-links.component";
import { DiagnosticComponent } from "./diagnostic/diagnostic.component";
import { SearchDiagnosticComponent } from "./diagnostic-search/search-diagnostic.component";
import { HeaderComponent } from "./shared/header/header.component";
import { MainComponent } from "./shared/main/main.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { RecommendationComponent } from "./diagnostic-recommendation/recommendation.component";
import { DiagnosticResultComponent } from "./diagnostic-result/diagnostic-result.component";
import { ParacetamolOnlyComponent } from "./home/paracetamol-only/paracetamol-only.component";
import { RgpdRequiredIfDirective } from "./diagnostic/contact-form/rgpd-validator.directive";
import { AgeFormComponent } from './diagnostic/age-form/age-form.component';
import { TailleFormComponent } from './diagnostic/taille-form/taille-form.component';
import { PoidsFormComponent } from './diagnostic/poids-form/poids-form.component';
import { TemperatureFormComponent } from './diagnostic/temperature-form/temperature-form.component';
import { CodePostalFormComponent } from './diagnostic/code-postal-form/code-postal-form.component';
import { ContactFormComponent } from './diagnostic/contact-form/contact-form.component';

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
    ParacetamolOnlyComponent,
    AgeFormComponent,
    TailleFormComponent,
    PoidsFormComponent,
    TemperatureFormComponent,
    CodePostalFormComponent,
    ContactFormComponent,
    RgpdRequiredIfDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
  constructor() {
    // Ajout des composants icones Font-Awesome utilisés
    library.add(
      faSearch,
      faInfoCircle,
      faExclamationTriangle,
      faArrowRight,
      faArrowLeft
    );
  }
}
