import { Component, OnInit } from "@angular/core";
import { DialogService } from "../../dialogs/dialog.service";
import { Dialog } from "../../models/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

    constructor(private dialogService: DialogService, private router: Router, private authService: AuthService) { }
    ngOnInit() {
        var dialog = new Dialog('Do you want to log out?', `Click 'Cancel' to return to page or 'Confirm' to log out`, 'Confirm');
        this.dialogService.showConfirmDialog(dialog);
        this.dialogService.cancelDialogEmitter
            .subscribe(
                () => {
                    this.router.navigate(['/admin']);
                }
            );
        this.dialogService.okDialogEmitter
            .subscribe(
                () => {
                    this.authService.logOut();
                }
            )
    }

}