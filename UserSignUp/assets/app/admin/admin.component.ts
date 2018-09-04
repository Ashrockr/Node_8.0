import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector : 'app-admin',
    templateUrl:'./admin.component.html',
    styles:[`
    #sticky-sidebar {
        min-height: 100vh;
    }
    `]
})
export class AdminComponent implements OnInit{

    constructor(private title:Title){}
    ngOnInit(){
        this.title.setTitle('Admin Page');
    }

}