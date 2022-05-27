import {Component} from '@angular/core';
import {PushStateRouter} from 'src/app/router/push-state-router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'custom-router';

    constructor(public pushStateRouter: PushStateRouter) {}
}
