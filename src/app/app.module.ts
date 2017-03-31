import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule }  from "@angular/material";

import { Http, RequestOptions } from "@angular/http";
import { AuthHttp, AuthConfig } from "angular2-jwt";

import { AuthService } from "./auth.service";
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-list/task-form/task-form.component';
import { TaskListService }  from './task-list/task-list.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { FlexLayoutModule }  from "@angular/flex-layout";

export function authHttpFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(
         new AuthConfig(),
         http,
         options
    );
}


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
     AuthService,
     TaskListService,
     {
       provide: AuthHttp,
       useFactory: authHttpFactory,
       deps: [ Http, RequestOptions ]
     }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
