import { Component, OnInit } from "@angular/core";
import { Dialog } from "../models/dialog";
import { DialogService } from "./dialog.service";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styles: [`
        .backdrop{
            background-color: rgba(0,0,0,0.6);
            position:fixed;
            top: 0;
            left:0;
            width: 100%;
            height: 100vh;
            z-index: 1031;
        }
    `]
})
export class DialogComponent implements OnInit {
    dialog: Dialog;
    display = 'none';
    displayMessage = 'none';
    displayProgress = 'none';
    confirmDialog = 'none';

    constructor(private dialogService: DialogService) { }
    onCancel() {
        this.display = 'none';
        this.displayMessage = 'none';
        this.displayProgress = 'none';
        this.confirmDialog = 'none';
    }

    onOk(){
        this.display = 'none';
        this.confirmDialog = 'none';
        this.dialogService.okDialog();
    }
    ngOnInit() {
        this.dialogService.messageToBeDisplayed
            .subscribe(
                (dialog: Dialog) => {
                    this.dialog = dialog;
                    this.display = 'block';
                    this.displayMessage = 'block';
                }
            );
        this.dialogService.messageWithProgressBarToBeDisplayed
            .subscribe(
                (dialog: Dialog) => {
                    this.dialog = dialog;
                    this.display = 'block';
                    this.displayProgress = 'block';
                }
            );
        this.dialogService.closeDialogEmitter
            .subscribe(
                () => {
                    this.onCancel();
                }
            );
        this.dialogService.confirmDialogEmitter
            .subscribe(
                (dialog: Dialog) => {
                    this.dialog = dialog;
                    this.display = 'block';
                    this.confirmDialog = 'block';

                }
            )
    }
}