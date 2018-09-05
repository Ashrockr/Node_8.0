import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    menus;
    constructor(private title: Title) {
    }
    ngOnInit() {
        this.title.setTitle('Admin Page');
        this.menus = [{
            name: 'Users',
            route: 'users'
        },
        {
            name: 'Users',
            route: 'users'
        }];
        for (var key in this.menus)
            console.log(this.menus[key]);
    }

}