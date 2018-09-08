import { Routes } from "@angular/router";
import { ErrorComponent } from "../error/error.component";
import { UnderConstructionComponent } from "../under-construction/under-construction.component";

export const USER_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: UnderConstructionComponent },
    { path: 'viewMessages', component: UnderConstructionComponent },
    { path: '**', component: ErrorComponent },
];
