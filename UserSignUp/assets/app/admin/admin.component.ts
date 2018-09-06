import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Menu } from "../models/menu.model";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    menus : Menu[]; 
    addMember:Menu;
    logout:Menu;
    viewMessage:Menu;
    viewUsers:Menu;
    viewReport:Menu;
    constructor(private title: Title) {
        this.title.setTitle('Admin Page');
        this.menus = new Array();
    }
    ngOnInit() {
        this.initializeMenu();
    }

    private initializeMenu() {
        this.addMember = new Menu('Add Member', 'addMember');
        var addAdmin = new Menu('Add Admin', 'addAdmin');
        var addUser = new Menu('Add User', 'addUser');
        this.addMember.addSubMenu(addAdmin, addUser);
        this.viewMessage = new Menu('View Message','viewMessages');
        this.viewUsers= new Menu('View Users','viewUsers');
        this.viewReport = new Menu('View Report','viewReport');
        var graph1 = new Menu('Graph1','graph1');
        var graph2 = new Menu('Graph2','graph2');
        var graph3 = new Menu('Graph3','graph3');
        this.viewReport.addSubMenu(graph1,graph2,graph3);
        this.logout = new Menu('Logout', '/logout');
        this.menus.push(this.addMember,this.viewMessage,this.viewUsers,this.viewReport,this.logout);
    }
}