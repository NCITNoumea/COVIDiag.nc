import { Routes } from "@angular/router";
import { Error404Component } from "./app/shared/errors/404.component";
import { HomeComponent } from './app/home/home.component';

export const appRoutes: Routes = [
    /*
    {
        path: "events/new",
        component: CreateEventComponent,
        canDeactivate: ["canDeactivateCreateEvent"]
    },
    {
        path: "events",
        component: EventsListComponent,
        resolve: { events: EventListResolver }
    },
    {
        path: "events/:id",
        component: EventDetailsComponent,
        resolve: { event: EventResolver }
    },
    {
        path: "events/sessions/new",
        component: CreateSessionComponent
    },
    */
    /*{ path: "user", loadChildren: "./modules/user/user.module#UserModule" }*/
    {
      path: "home",
      component: HomeComponent
    },
    { path: "404", component: Error404Component },
    { path: "", redirectTo: "/home", pathMatch: "full" }

];
