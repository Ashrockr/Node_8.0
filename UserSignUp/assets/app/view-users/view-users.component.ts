import { Component, OnInit, ViewChild } from "@angular/core";
import { ViewUsersService } from "./view-users.service";
import { DialogService } from "../dialogs/dialog.service";
import { Dialog } from "../models/dialog";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
    selector: 'app-message',
    templateUrl: './view-users.component.html',
    styleUrls: ['view-users.component.css'],
    providers: [ViewUsersService]
})
export class ViewUsersComponent implements OnInit {
    users;
    columnsToDisplay=['name','email','isAdmin','date'];
    totalUser: number = 0;
    loadedUser: number = 0;
    limit: number = 5;
    dialog;
    key: string = 'name'; //set default
    reverse: boolean = false;
    currentPage: number = 1;
    totalPage: number = 1;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private viewUserService: ViewUsersService, private dialogService: DialogService) { }
    ngOnInit() {
        this.dialog = new Dialog('Loading...', 'Please Wait');
        this.dialogService.showDialogWithProgressBar(this.dialog);
        this.viewUserService.getUserCount()
            .subscribe(
                (data) => {
                    this.totalUser = data;
                    this.totalPage = Math.ceil(this.totalUser / this.limit);
                    this.getUsers(1);
                    this.users.sort = this.sort;
                },
                (error) => {
                    this.dialogService.closeDialogs();
                    this.dialog = new Dialog('Error', error.message);
                    this.dialogService.showDialog(this.dialog);
                }
            );
        // this.viewUserService.viewAllUser()
        //     .subscribe(
        //         (data) => {
        //             this.loadUsers(data);
        //         }, error => {
        //             this.dialogService.closeDialogs();
        //             dialog = new Dialog('Error', error.message);
        //             this.dialogService.showDialog(dialog);
        //         }
        //     )
    }

    loadUsers(data) {
        this.users = data;
        this.dialogService.closeDialogs();
    }
    getDate(id) {
        let timeStamp = id.toString().substring(0, 8);
        return new Date(parseInt(timeStamp, 16) * 1000);
    }

    getUsers(page: number) {        
        var skipUsers = this.limit * (page - 1);
        this.viewUserService.getUsers(this.limit, skipUsers)
            .subscribe(
                (data) => {
                    this.users = new MatTableDataSource(this.transformer(data));
                    this.currentPage=page;
                    this.dialogService.closeDialogs();
                },
                (error) => {
                    this.dialogService.closeDialogs();
                    this.dialog = new Dialog('Error', error.message);
                    this.dialogService.showDialog(this.dialog);
                }
            );
    }

    transformer(data) {
        var transformedUsers = [];
        for (let user of data) {
            transformedUsers.push({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                gender: user.gender,
                date: this.getDate(user.id)
            })
        }
        return transformedUsers;
    }
    sortData(event){
        console.log(event);
        
    }
}