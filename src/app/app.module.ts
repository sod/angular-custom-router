import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CustomRoutingModule} from 'src/app/custom-routing.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouteAComponent} from './route-a/route-a.component';
import {RouteBComponent} from './route-b/route-b.component';
import {RouteCComponent} from './route-c/route-c.component';

@NgModule({
    declarations: [AppComponent, RouteAComponent, RouteBComponent, RouteCComponent],
    imports: [BrowserModule, AppRoutingModule, CustomRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
