import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotepadComponent } from './pages/notepad/notepad.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccessTokenInterceptor} from "../interceptors/access-token.interceptor";
import { StatisticsComponent } from './pages/statistics/statistics.component';
import {ComponentsModule} from "./components/components.module";

@NgModule({
  declarations: [
    AppComponent,
    NotepadComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
