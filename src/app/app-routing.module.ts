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
import {AdminAccueilComponent} from "./pages/vues/admin/admin-accueil/admin-accueil.component";
import {AdminUtilisateurComponent} from "./pages/vues/admin/admin-utilisateur/admin-utilisateur.component";
import {CommercantTypeComponent} from "./pages/vues/commercant/commercant-type/commercant-type.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'signIn', component: AccountLoginComponent },
  { path: 'signUp', component: AccountCreationComponent },
  {
    path: 'commercant',
    component: CommercantComponent,
    children: [
      { path: 'produits' , component: CommercantsProduitsComponent },
      { path: 'types' , component: CommercantTypeComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminAccueilComponent,
    children: [
      { path: 'Utilisateurs' , component: AdminUtilisateurComponent },
    ]
  },
  { path: 'produitsBoutique', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
