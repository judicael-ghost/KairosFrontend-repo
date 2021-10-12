import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CommandeComponent } from './commande/commande.component';
import { TableComponent } from './table/table.component';
import { DetailComponent } from './detail/detail.component';
import { ProduitComponent } from './produit/produit.component';
import { ParametreComponent } from './parametre/parametre.component';
import { ProduitDetailComponent } from './produit-detail/produit-detail.component';
import { AchatComponent } from './achat/achat.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './service/login-guard.service';
import { CategorieAddComponent } from './Ingredients/categorie-add/categorie-add.component';
import { UniteListComponent } from './Ingredients/unite-list/unite-list.component';
import { UniteDetailsComponent } from './Ingredients/unite-details/unite-details.component';
import { UniteAddComponent } from './Ingredients/unite-add/unite-add.component';
import { CategorieListComponent } from './Ingredients/categorie-list/categorie-list.component';
import { CategorieDetailsComponent } from './Ingredients/categorie-details/categorie-details.component';
import { LieuListComponent } from './Ingredients/lieu-list/lieu-list.component';
import { LieuDetailsComponent } from './Ingredients/lieu-details/lieu-details.component';
import { LieuAddComponent } from './Ingredients/lieu-add/lieu-add.component';
import { PrixListComponent } from './Ingredients/prix-list/prix-list.component';
import { PrixDetailsComponent } from './Ingredients/prix-details/prix-details.component';
import { PrixAddComponent } from './Ingredients/prix-add/prix-add.component';
import { MarcherListComponent } from './Ingredients/marcher-list/marcher-list.component';
import { MarcherDetailsComponent } from './Ingredients/marcher-details/marcher-details.component';
import { MarcherAddComponent } from './Ingredients/marcher-add/marcher-add.component';
import { IngredientListComponent } from './Ingredients/ingredient-list/ingredient-list.component';
import { IngredientDetailsComponent } from './Ingredients/ingredient-details/ingredient-details.component';
import { IngredientAddComponent } from './Ingredients/ingredient-add/ingredient-add.component';
import { HistoriqueAchatComponent } from './Ingredients/historique-achat/historique-achat.component';
import { StatistiqueComponent } from './Ingredients/statistique/statistique.component';
import { StockMenuComponent } from './Ingredients/stock-menu/stock-menu.component';
import { RecetteComponent } from './recette/recette.component';
import { FichetechComponent } from './fichetech/fichetech.component';
import { AfftechComponent } from './afftech/afftech.component';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  {path : "" , component : LoginComponent},
  {path : "accueil" , canActivate:[LoginGuard],component : AccueilComponent},
  {path : "table" , canActivate:[LoginGuard],component : TableComponent},
  {path : "achat" , canActivate:[LoginGuard] ,component : AchatComponent},
  {path : "facture" , canActivate:[LoginGuard] ,component : FactureComponent},
  {path : "commande/:idTable", canActivate:[LoginGuard], component : CommandeComponent},
  {path : "client" , canActivate:[LoginGuard],component : ClientComponent},
  {path : "client/:id/:nom/:tel" , canActivate:[LoginGuard] , component : DetailComponent},
  {path : "produit" , canActivate:[LoginGuard], component : ProduitComponent},
  {path : "produit/:id" ,canActivate:[LoginGuard], component : ProduitDetailComponent},
  {path : "parametre" ,canActivate:[LoginGuard], component : ParametreComponent},

  //celin
  { path: 'unites', canActivate:[LoginGuard],component: UniteListComponent },
  { path: 'unites/:id', canActivate:[LoginGuard],component: UniteDetailsComponent },
  { path: 'addunite', canActivate:[LoginGuard],component: UniteAddComponent },
  { path: 'categories', canActivate:[LoginGuard],component: CategorieListComponent },
  { path: 'categories/:id', canActivate:[LoginGuard],component: CategorieDetailsComponent },
  { path: 'addcategorie', canActivate:[LoginGuard],component: CategorieAddComponent },
  { path: 'lieux', canActivate:[LoginGuard],component: LieuListComponent },
  { path: 'lieux/:id',canActivate:[LoginGuard], component: LieuDetailsComponent },
  { path: 'addLieu',canActivate:[LoginGuard], component: LieuAddComponent },
  { path: 'prix', canActivate:[LoginGuard],component: PrixListComponent },
  { path: 'prix/:id',canActivate:[LoginGuard], component: PrixDetailsComponent },
  { path: 'addPrix',canActivate:[LoginGuard], component: PrixAddComponent },
  { path: 'marchers', canActivate:[LoginGuard],component: MarcherListComponent },
  { path: 'marchers/:id',canActivate:[LoginGuard], component: MarcherDetailsComponent },
  { path: 'addMarche',canActivate:[LoginGuard], component: MarcherAddComponent },
  { path: 'ingredients',canActivate:[LoginGuard], component: IngredientListComponent },
  { path: 'ingredients/:id',canActivate:[LoginGuard], component: IngredientDetailsComponent },
  { path: 'addIngredient', canActivate:[LoginGuard],component: IngredientAddComponent },
  { path: 'historiqueachats',canActivate:[LoginGuard], component: HistoriqueAchatComponent },
  { path: 'statistiques',canActivate:[LoginGuard], component: StatistiqueComponent },

  //jacky
  {path:'recette/:id',component:RecetteComponent},
  {path:'recette',component:RecetteComponent},
  {path:'fichetech/:id',component:FichetechComponent},
  {path:'afftech/:id',component:AfftechComponent},
  {path:'listerecette',component:ProduitListeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
