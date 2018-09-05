import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./auth/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: 'ROLE_OTHER' } }
];

export const routing = RouterModule.forRoot(APP_ROUTES);