import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountLoginComponent} from "./pages/account-login/account-login.component";
import {AccountCreationComponent} from "./pages/account-creation/account-creation.component";
import {HomeComponent} from "./pages/home/home.component";
import {ErrorComponent} from "./pages/error/error.component";
import {CommercantComponent} from "./pages/vues/commercant/commercant-accueil/commercant.component";
import {
  CommercantsProduitsComponent
} from "./pages/vues/commercant/commercants-produits/commercants-produits.component";
import { PaymentsComponent } from './pages/payments/payments.component';
import {ProductsComponent} from "./pages/products/products.component";
import {AuthGuard} from "./shared/guard/AuthGuard";
import {AdminAccueilComponent} from "./pages/vues/admin/admin-accueil/admin-accueil.component";
import {AdminUtilisateurComponent} from "./pages/vues/admin/admin-utilisateur/admin-utilisateur.component";
import {CommercantTypeComponent} from "./pages/vues/commercant/commercant-type/commercant-type.component";
import {NotAllowedComponent} from "./pages/not-allowed/not-allowed.component";
import {ClientAccueilComponent} from "./pages/vues/client/client-accueil/client-accueil.component";
import {ClientAvantagesComponent} from "./pages/vues/client/client-avantages/client-avantages.component";
import {BasketComponent} from "./pages/basket/basket.component";
import {ProfilComponent} from "./pages/vues/profil/profil.component";
import {ClientCardComponent} from "./pages/vues/client/client-card/client-card.component";
import {ClientAchatsComponent} from "./pages/vues/client/client-achats/client-achats.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardCommercantComponent} from "./dashboard-commercant/dashboard-commercant.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: NotAllowedComponent },
  { path: 'signIn', component: AccountLoginComponent },
  { path: 'signUp', component: AccountCreationComponent },
  { path: 'panier', component: BasketComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'payment', component: PaymentsComponent },
  {
    path: 'commercant',
    component: CommercantComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: ['COMMERCANT']
      }
    },
    children: [
      { path: 'produits' , component: CommercantsProduitsComponent},
      { path: 'types' , component: CommercantTypeComponent },
      { path: 'dashboard' , component: DashboardCommercantComponent },

    ]
  },
  {
    path: 'admin',
    component: AdminAccueilComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: ['ADMIN']
      }
    },
    children: [
      { path: 'Utilisateurs' , component: AdminUtilisateurComponent },
      { path: 'dashboard' , component: DashboardComponent },
    ]
  },
  {
    path: 'client',
    component: ClientAccueilComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: ['CLIENT']
      }
    },
    children: [
      { path: 'Avantages' , component: ClientAvantagesComponent },
      { path: 'Card' , component: ClientCardComponent },
      { path: 'Achats' , component: ClientAchatsComponent },
    ]
  },
  { path: 'produitsBoutique/:id', component: ProductsComponent,
    canActivate: []},
  { path: 'produitsBoutique', component: ProductsComponent,
    canActivate: []
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
