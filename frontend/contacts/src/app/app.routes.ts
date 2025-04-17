import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard, loginGuard } from './auth/auth.guard';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactsListComponent, pathMatch: 'full' },
    { path: 'contacts/new', component: CreateContactComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: 'contacts/:id/edit', component: UpdateContactComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: 'contacts/:id', component: ContactDetailsComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: 'signin', component: SigninComponent, canActivate: [loginGuard]},
    { path: 'signup', component: SignupComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];
