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
import {ProductsComponent} from "./pages/products/products.component";
import {AuthGuard} from "./shared/guard/AuthGuard";
import {AdminAccueilComponent} from "./pages/vues/admin/admin-accueil/admin-accueil.component";
import {AdminUtilisateurComponent} from "./pages/vues/admin/admin-utilisateur/admin-utilisateur.component";
import {CommercantTypeComponent} from "./pages/vues/commercant/commercant-type/commercant-type.component";
import {NotAllowedComponent} from "./pages/not-allowed/not-allowed.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: NotAllowedComponent },
  { path: 'signIn', component: AccountLoginComponent },
  { path: 'signUp', component: AccountCreationComponent },
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
    ]
  },
  { path: 'produitsBoutique', component: ProductsComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
