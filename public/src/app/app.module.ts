import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {UserSignInComponent} from './components/user-sign-in/user-sign-in.component';
import {RouterModule, Routes} from "@angular/router";
import {AnnonceElementComponent} from './components/annonce-element/annonce-element.component';
import {AnnonceService} from "./services/AnnonceService";
import {SignInService} from "./services/SignInService";
import {NotFoundComponent} from './not-found/not-found.component';
import {AnnonceCreationComponent} from './components/annonce-creation/annonce-creation.component';
import {UserService} from "./services/UserService";
import {FormsModule} from "@angular/forms";
import {AnnonceDetailComponent} from "./components/annonce-detail/annonce-detail.component";
import {FirebaseUtilityService} from "./services/FirebaseUtilityService";
import {CategorieService} from "./services/CategorieService";
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavSearchComponent} from './components/nav-search/nav-search.component';
import {ChatService} from "./services/ChatService";
import {SearchRequestService} from "./services/SearchRequestService";
import {AnnonceListSearchComponent} from './components/annonce-list-search/annonce-list-search.component';
import {AnnonceListContainerComponent} from './components/annonce-list-container/annonce-list-container.component';
import {LoadingDialogComponent} from './components/loading-dialog/loading-dialog.component';
import {RulesComponent} from './components/rules/rules.component';
import {PaginationModule} from './shared/pagination/pagination.module';
import {LoggerService} from "./services/LoggerService";
import {NewAnnonceGuardGuard} from "./components/new-annonce-guard/new-annonce-guard.guard";
import { ChatComponent } from './components/chat/chat.component';
import { ToastComponent } from './components/toast/toast.component';
import { ChatElementComponent } from './components/chat-element/chat-element.component';
import { MessageElementComponent } from './components/message-element/message-element.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import {MessageService} from "./services/MessageService";
import {PhotoService} from "./services/PhotoService";

const appRoutes: Routes = [
  {path: 'annonces', component: AnnonceListContainerComponent},
  {path: 'annonces/search/:keyword', component: AnnonceListSearchComponent},
  {path: 'annonces/new', component: AnnonceCreationComponent, canActivate: [NewAnnonceGuardGuard]},
  {path: 'annonces/view/:uid', component: AnnonceDetailComponent},
  {path: 'login', component: UserSignInComponent},
  {path: 'chat', component: ChatComponent, canActivate: [NewAnnonceGuardGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'rules', component: RulesComponent},
  {path: '', redirectTo: '/annonces', pathMatch: 'full'},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserSignInComponent,
    AnnonceElementComponent,
    AnnonceDetailComponent,
    NotFoundComponent,
    AnnonceCreationComponent,
    NavbarComponent,
    NavSearchComponent,
    AnnonceListSearchComponent,
    AnnonceListContainerComponent,
    LoadingDialogComponent,
    RulesComponent,
    ChatComponent,
    ToastComponent,
    ChatElementComponent,
    MessageElementComponent,
    MessageListComponent
  ],
  entryComponents: [
    LoadingDialogComponent
  ],
  imports: [
    PaginationModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [PhotoService, MessageService, AnnonceService, SignInService, UserService, FirebaseUtilityService, CategorieService, ChatService, SearchRequestService, LoggerService, NewAnnonceGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
