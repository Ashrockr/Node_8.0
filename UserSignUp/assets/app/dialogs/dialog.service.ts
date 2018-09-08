import { EventEmitter } from "@angular/core";
import { Dialog } from "../models/dialog";

export class DialogService{
    messageToBeDisplayed = new EventEmitter<Dialog>();
    messageWithProgressBarToBeDisplayed = new EventEmitter<Dialog>();
    closeDialogEmitter = new EventEmitter();
    okDialogEmitter = new EventEmitter();
    cancelDialogEmitter = new EventEmitter();
    confirmDialogEmitter = new EventEmitter<Dialog>();
    
    showDialog(dialog:any){
        const dialogData = new Dialog(dialog.title,dialog.message);
        this.messageToBeDisplayed.emit(dialogData);
    }

    showConfirmDialog(dialog:any){
        const dialogData = new Dialog(dialog.title,dialog.message,dialog.okBtn);
        this.confirmDialogEmitter.emit(dialogData);
    }

    showDialogWithProgressBar(dialog:any){
        const dialogData = new Dialog(dialog.title,dialog.message);
        this.messageWithProgressBarToBeDisplayed.emit(dialogData);
    }

    closeDialogs(){
        this.closeDialogEmitter.emit();
    }

    okDialog(){
        this.okDialogEmitter.emit();
    }
    cancelDialogs(){
        this.cancelDialogEmitter.emit();
    }
}