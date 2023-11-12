import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountCreationComponent} from './account-creation/account-creation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./shared/service/accountService";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AccountLoginComponent } from './account-login/account-login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    AccountLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
