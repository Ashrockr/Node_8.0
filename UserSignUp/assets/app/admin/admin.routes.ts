import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ErrorComponent } from "../error/error.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addUser', component: DashboardComponent },
    { path: 'addAdmin', component: DashboardComponent },
    { path: 'graph1', component: DashboardComponent },
    { path: 'graph2', component: DashboardComponent },
    { path: '**', component: ErrorComponent },
];
