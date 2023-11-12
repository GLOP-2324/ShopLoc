import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountLoginComponent} from "./account-login/account-login.component";
import {AccountCreationComponent} from "./account-creation/account-creation.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signIn', component: AccountLoginComponent },
  { path: 'signUp', component: AccountCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
