import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ErrorComponent } from "../error/error.component";
import { UnderConstructionComponent } from "../under-construction/under-construction.component";
import { LogoutComponent } from "./logout/logout.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addUser', component: DashboardComponent },
    { path: 'addAdmin', component: DashboardComponent },
    { path: 'graph1', component: DashboardComponent },
    { path: 'graph2', component: DashboardComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', component: ErrorComponent },
];
