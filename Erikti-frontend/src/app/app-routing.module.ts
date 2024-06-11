import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {EventsComponent} from "./events/events.component";
import {OrganizationsComponent} from "./organizations/organizations.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {AboutComponent} from "./about/about.component";
import {UserComponent} from "./user/user.component";
import {NewEventComponent} from "./events/new-event/new-event.component";
import {OrganizationDetailComponent} from "./organizations/organization-detail/organization-detail.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {ConfirmationComponent} from "./components/confirmation/confirmation.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  // {
  //   path: '/',
  //   component: HomeComponent,
  // },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'create-event',
    component: NewEventComponent
  },
  {
    path: 'organizations/organization-detail/:organizationId',
    component: OrganizationDetailComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
  {
    path: 'not-found',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
