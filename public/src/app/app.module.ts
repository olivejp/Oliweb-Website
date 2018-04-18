import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {AnnonceListComponent} from './components/annonce-list/annonce-list.component';
import {UserSignInComponent} from './components/user-sign-in/user-sign-in.component';
import {RouterModule, Routes} from "@angular/router";
import {AnnonceElementComponent} from './components/annonce-element/annonce-element.component';
import {AnnonceService} from "./services/AnnonceService";
import {UserService} from "./services/UserService";

const appRoutes: Routes = [
  {path: 'annonces', component: AnnonceListComponent},
  {path: 'annonces/:id', component: AnnonceElementComponent},
  {path: 'auth', component: UserSignInComponent},
  {path: '', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnnonceListComponent,
    UserSignInComponent,
    AnnonceElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AnnonceService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
