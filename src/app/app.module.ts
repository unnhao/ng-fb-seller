import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LiveComponent } from './live/live.component';
import { AccountComponent } from './account/account.component';
import { IframeSrcPipe } from './customize.pip';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    LiveComponent,
    AccountComponent,
    IframeSrcPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
