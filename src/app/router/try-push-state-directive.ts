import {Directive, HostListener, Input} from '@angular/core';
import {PushStateRouter} from 'src/app/router/push-state-router';

@Directive({
    selector: '[ryTryPushState]',
})
export class TryPushStateDirective {
    @Input() href?: string;

    constructor(private pushStateRouter: PushStateRouter) {}

    @HostListener('click', ['$event'])
    public click(event: Event): void {
        event.preventDefault();

        if (this.href) {
            this.pushStateRouter.push(this.href);
        }
    }
}
