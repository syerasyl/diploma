import { NgModule, inject} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpResponseBase} from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './pages/register/register.component';
import { AppNavbarComponent } from './layout/app.navbar/app.navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EventsComponent } from './events/events.component';
import {MatSelectModule} from "@angular/material/select";
import { OrganizationsComponent } from './organizations/organizations.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { OrganizationDetailComponent } from './organizations/organization-detail/organization-detail.component';

import { MessageService } from "primeng/api";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {NgxPaginationModule} from "ngx-pagination";
import {SplitterModule} from "primeng/splitter";
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';
import {NgOptimizedImage} from "@angular/common";
import {TreeModule} from "primeng/tree";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppNavbarComponent,
    EventsComponent,
    OrganizationsComponent,
    ContactsComponent,
    AboutComponent,
    UserComponent,
    NewEventComponent,
    OrganizationDetailComponent,
    NotfoundComponent,
    ConfirmationComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonDirective,
    Ripple,
    TableModule,
    PaginatorModule,
    NgxPaginationModule,
    SplitterModule,
    Button,
    NgOptimizedImage,
    TreeModule,

  ],
  providers: [
    HttpClient,
    provideAnimationsAsync(),
    MessageService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   // useClass: HttpTokenInterceptor,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
