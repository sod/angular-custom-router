import {NgModule} from '@angular/core';
import {RouteAComponent} from 'src/app/route-a/route-a.component';
import {RouteBComponent} from 'src/app/route-b/route-b.component';
import {RouteCComponent} from 'src/app/route-c/route-c.component';
import {PushStateRouterModule, PushStateRoutes} from 'src/app/router/push-state-router';

const routes: PushStateRoutes = [
    {
        path: 'a',
        component: RouteAComponent,
    },
    {
        path: 'b',
        component: RouteBComponent,
    },
    {
        path: 'c',
        component: RouteCComponent,
    },
];

@NgModule({
    imports: [PushStateRouterModule.forRoot(routes)],
    exports: [PushStateRouterModule],
})
export class CustomRoutingModule {}
