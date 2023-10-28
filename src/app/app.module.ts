import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountCreationComponent} from './account-creation/account-creation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./shared/service/accountService";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
