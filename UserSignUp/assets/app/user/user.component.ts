import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Menu } from "../models/menu.model";
import { DialogService } from "../dialogs/dialog.service";
import { AuthService } from "../auth/auth.service";
import { Dialog } from "../models/dialog";
import { User } from "../models/user.model";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;
    menus: Menu[];
    dashboard: Menu;
    viewUsers: Menu;
    viewReport: Menu;
    constructor(private title: Title, private dialogService: DialogService, private authService: AuthService) {
        this.title.setTitle('User Page');
        this.menus = new Array();
    }
    ngOnInit() {
        this.user = this.authService.getUser();
        this.initializeMenu();
    }

    private initializeMenu() {
        this.dashboard = new Menu('Dashboard', 'dashboard');
        this.viewUsers = new Menu('View Users', 'viewUsers');
        this.menus.push(this.dashboard, this.viewUsers);
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