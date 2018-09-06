import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'addUser', component: WelcomeComponent },
    { path: 'addAdmin', component: WelcomeComponent },
    { path: 'graph1', component: WelcomeComponent },
    { path: 'graph2', component: WelcomeComponent },
    { path: 'graph3', component: WelcomeComponent }
];
