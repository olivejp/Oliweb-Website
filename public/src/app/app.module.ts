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
import {SignInService} from "./services/SignInService";
import {NotFoundComponent} from './not-found/not-found.component';
import {MaterialModule} from "./modules/material.module";
import {AnnonceCreationComponent} from './components/annonce-creation/annonce-creation.component';
import {UserService} from "./services/UserService";
import {FormsModule} from "@angular/forms";
import {AnnonceDetailComponent} from "./components/annonce-detail/annonce-detail.component";

const appRoutes: Routes = [
  {path: 'annonces', component: AnnonceListComponent},
  {path: 'annonces/new', component: AnnonceCreationComponent},
  {path: 'annonces/view/:uid', component: AnnonceDetailComponent},
  {path: 'auth', component: UserSignInComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnnonceListComponent,
    UserSignInComponent,
    AnnonceElementComponent,
    AnnonceDetailComponent,
    NotFoundComponent,
    AnnonceCreationComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
  ],
  providers: [AnnonceService, SignInService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
