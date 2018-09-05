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
            id: "user",
            name: 'Users',
            route: 'users',
            subMenus: [{
                name: 'SubUsers',
                route: 'subMenu1'
            }, {
                name: 'SubUsers',
                route: 'subMenu2'
            }]
        },
        {
            id: "user1",
            name: 'Users',
            route: 'admin'
        }];
        for (var key in this.menus)
            console.log(this.menus[key]);
    }

}