import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccountCreationComponent} from './pages/account-creation/account-creation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "./shared/service/accountService";
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccountLoginComponent} from './pages/account-login/account-login.component';
import {HomeComponent} from './pages/home/home.component';
import {CommercantComponent} from './pages/vues/commercant/commercant-accueil/commercant.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FormComponent} from './components/form/form.component';
import {DataTablesModule} from "angular-datatables";
import {DatatableComponent} from './components/datatable/datatable.component';
import {
  CommercantsProduitsComponent
} from './pages/vues/commercant/commercants-produits/commercants-produits.component';
import {SearchComponent} from './components/search/search.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {ProductsComponent} from './pages/products/products.component';
import {ErrorComponent} from './pages/error/error.component';
import {AuthInterceptor} from "./shared/auth-interceptor.service";
import { AdminAccueilComponent } from './pages/vues/admin/admin-accueil/admin-accueil.component';
import { AdminUtilisateurComponent } from './pages/vues/admin/admin-utilisateur/admin-utilisateur.component';
import { CommercantTypeComponent } from './pages/vues/commercant/commercant-type/commercant-type.component';
import {MatIconModule} from "@angular/material/icon";
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { ClientAccueilComponent } from './pages/vues/client/client-accueil/client-accueil.component';
import { ClientAvantagesComponent } from './pages/vues/client/client-avantages/client-avantages.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProfilComponent } from './pages/vues/profil/profil.component';
import { ClientCardComponent } from './pages/vues/client/client-card/client-card.component';
import { ClientAchatsComponent } from './pages/vues/client/client-achats/client-achats.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    AccountLoginComponent,
    HomeComponent,
    CommercantComponent,
    NavbarComponent,
    SidebarComponent,
    FormComponent,
    DatatableComponent,
    CommercantsProduitsComponent,
    SearchComponent,
    CarouselComponent,
    ProductsComponent,
    ErrorComponent,
    AdminAccueilComponent,
    AdminUtilisateurComponent,
    CommercantTypeComponent,
    NotAllowedComponent,
    ClientAccueilComponent,
    ClientAvantagesComponent,
    BasketComponent,
    ProfilComponent,
    ClientCardComponent,
    ClientAchatsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
    NgxPermissionsModule.forRoot(),
    DataTablesModule,
  ],
  providers: [
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
