import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteAComponent} from 'src/app/route-a/route-a.component';
import {RouteBComponent} from 'src/app/route-b/route-b.component';
import {RouteCComponent} from 'src/app/route-c/route-c.component';

const routes: Routes = [
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
