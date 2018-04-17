import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {AnnonceService} from './annonce-service/annonce-service.component';
import {UserServiceComponent} from './user-service/user-service.component';
import {AnnonceListComponent} from './annonce-list-component/annonce-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnnonceService,
    UserServiceComponent,
    AnnonceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AnnonceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
