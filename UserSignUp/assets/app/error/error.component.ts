import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Title } from "@angular/platform-browser";

@Component({
    templateUrl: './error.component.html',
    styles: [`
        .error-template {padding: 40px 15px;text-align: center;}
        .error-actions {margin-top:15px;margin-bottom:15px;}
        .error-actions .btn { margin-right:10px; }
`]
})
export class ErrorComponent {
    constructor(private location: Location, private title: Title) {
        this.title.setTitle('Page Not Found');
    }

    goBack() {
        this.location.back();
    }

}