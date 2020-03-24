import { Routes } from "@angular/router";
import { Error404Component } from "./app/shared/errors/404.component";
import { HomeComponent } from './app/home/home.component';
import { DiagnosticComponent } from './app/diagnostic/diagnostic.component';
import { SearchDiagnosticComponent } from './app/diagnostic-search/search-diagnostic.component';

export const appRoutes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "diagnostic",
      component: DiagnosticComponent
    },
    {
      path: "search-diagnostic",
      component: SearchDiagnosticComponent
    },
    { path: "404", component: Error404Component },
    { path: "", redirectTo: "", pathMatch: "full" }
  ];
