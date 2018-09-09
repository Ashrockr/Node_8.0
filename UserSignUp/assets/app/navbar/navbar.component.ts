import { Component, Input, OnInit } from "@angular/core";
import { Menu } from "../models/menu.model";
import { Dialog } from "../models/dialog";
import { DialogService } from "../dialogs/dialog.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../models/user.model";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls:['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() menus: Menu[];
    @Input() from : String;
    user : User;
    constructor(private dialogService: DialogService, private authService: AuthService) { }

    ngOnInit(){
        this.user = this.authService.getUser();
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