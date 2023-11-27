import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountCreationComponent} from './pages/account-creation/account-creation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./shared/service/accountService";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AccountLoginComponent } from './pages/account-login/account-login.component';
import { HomeComponent } from './pages/home/home.component';
import { CommercantComponent } from './pages/commercant/commercant.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    AccountLoginComponent,
    HomeComponent,
    CommercantComponent,
    NavbarComponent,
    SidebarComponent
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
