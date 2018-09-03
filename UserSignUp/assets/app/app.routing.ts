import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);