import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle('Admin Page');
    }

}