import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Menu } from "../models/menu.model";
import { Dialog } from "../models/dialog";
import { DialogService } from "../dialogs/dialog.service";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    menus: Menu[];
    dashboard: Menu;
    viewMessage: Menu;
    viewUsers: Menu;
    viewReport: Menu;
    constructor(private title: Title, private dialogService: DialogService, private authService: AuthService) {
        this.title.setTitle('Admin Page');
        this.menus = new Array();
    }
    ngOnInit() {
        this.initializeMenu();
    }

    private initializeMenu() {
        this.dashboard = new Menu('Dashboard', 'dashboard');
        this.viewMessage = new Menu('View Message', 'viewMessages');
        this.viewUsers = new Menu('View Users', 'viewUsers');
        this.viewReport = new Menu('View Report', 'viewReport');
        this.menus.push(this.dashboard, this.viewMessage, this.viewUsers, this.viewReport);
    }

    logOut() {
        var dialog = new Dialog('Do you want to log out?', `Click 'Cancel' to return to page or 'Confirm' to log out`, 'Confirm');
        this.dialogService.showConfirmDialog(dialog);
        this.dialogService.cancelDialogEmitter
            .subscribe();
        this.dialogService.okDialogEmitter
            .subscribe(
                () => {
                    this.authService.logOut();
                }
            )
    }
}