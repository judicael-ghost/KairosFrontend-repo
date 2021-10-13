import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule , HttpClientXsrfModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { ClientComponent } from './client/client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print'
import { DetailComponent } from './detail/detail.component';
import { CommandeComponent } from './commande/commande.component';
import { ToastrModule } from 'ngx-toastr';
import localFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ProduitComponent } from './produit/produit.component';
import { ParametreComponent } from './parametre/parametre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './service/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import {DatePipe} from '@angular/common';
import { ProduitDetailComponent } from './produit-detail/produit-detail.component';
import { FilterPipe } from './pipe/filter.pipe';
import { LimitToPipe } from './pipe/limit-to.pipe';
import { AchatComponent } from './achat/achat.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { HttpXsrfInterceptorService } from './service/interceptors/http-xsrf-interceptor.service';
import { LoginService } from './service/login.service';
import { LoginGuard } from './service/login-guard.service';
import { CategorieAddComponent } from './Ingredients/categorie-add/categorie-add.component';
import { CategorieDetailsComponent } from './Ingredients/categorie-details/categorie-details.component';
import { CategorieListComponent } from './Ingredients/categorie-list/categorie-list.component';
import { HistoriqueAchatComponent } from './Ingredients/historique-achat/historique-achat.component';
import { IngredientAddComponent } from './Ingredients/ingredient-add/ingredient-add.component';
import { IngredientDetailsComponent } from './Ingredients/ingredient-details/ingredient-details.component';
import { IngredientListComponent } from './Ingredients/ingredient-list/ingredient-list.component';
import { LieuAddComponent } from './Ingredients/lieu-add/lieu-add.component';
import { LieuDetailsComponent } from './Ingredients/lieu-details/lieu-details.component';
import { LieuListComponent } from './Ingredients/lieu-list/lieu-list.component';
import { MarcherAddComponent } from './Ingredients/marcher-add/marcher-add.component';
import { MarcherDetailsComponent } from './Ingredients/marcher-details/marcher-details.component';
import { MarcherListComponent } from './Ingredients/marcher-list/marcher-list.component';
import { MessageComponent } from './Ingredients/message/message.component';
import { PrixAddComponent } from './Ingredients/prix-add/prix-add.component';
import { PrixDetailsComponent } from './Ingredients/prix-details/prix-details.component';
import { PrixListComponent } from './Ingredients/prix-list/prix-list.component';
import { StatistiqueComponent } from './Ingredients/statistique/statistique.component';
import { UniteAddComponent } from './Ingredients/unite-add/unite-add.component';
import { UniteDetailsComponent } from './Ingredients/unite-details/unite-details.component';
import { UniteListComponent } from './Ingredients/unite-list/unite-list.component';
import { StockMenuComponent } from './Ingredients/stock-menu/stock-menu.component';
import { RecetteComponent } from './recette/recette.component';
import { FichetechComponent } from './fichetech/fichetech.component';
import { AfftechComponent } from './afftech/afftech.component';
import { AddEditRecetteComponent } from './recette/add-edit-recette/add-edit-recette.component';
import { AddEditEditRecetteComponent } from './recette/add-edit-edit-recette/add-edit-edit-recette.component';
import { ListeRecetteComponent } from './recette/liste-recette/liste-recette.component';
import { ListeAfftechComponent } from './afftech/liste-afftech/liste-afftech.component';
import { AddEditFichetechComponent } from './fichetech/add-edit-fichetech/add-edit-fichetech.component';
import { AddEditEditFichetechComponent } from './fichetech/add-edit-edit-fichetech/add-edit-edit-fichetech.component';
import { ListeFichetechComponent } from './fichetech/liste-fichetech/liste-fichetech.component';
import { ListAfftecComponent } from './afftech/list-afftec/list-afftec.component';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { ListeProdComponent } from './produit-liste/liste-prod/liste-prod.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FactureComponent } from './facture/facture.component';




registerLocaleData(localFr)


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    ClientComponent,
    DetailComponent,
    CommandeComponent,
    ProduitComponent,
    ParametreComponent,
    ProduitDetailComponent,
    FilterPipe,
    LimitToPipe,
    AchatComponent,
    LoginComponent,
    CategorieAddComponent,
    CategorieDetailsComponent,
    CategorieListComponent,
    HistoriqueAchatComponent,
    IngredientAddComponent,
    IngredientDetailsComponent,
    IngredientListComponent,
    LieuAddComponent,
    LieuDetailsComponent,
    LieuListComponent,
    MarcherAddComponent,
    MarcherDetailsComponent,
    MarcherListComponent,
    MessageComponent,
    PrixAddComponent,
    PrixDetailsComponent,
    PrixListComponent,
    StatistiqueComponent,
    UniteAddComponent,
    UniteDetailsComponent,
    UniteListComponent,
    StockMenuComponent,
    RecetteComponent,
    FichetechComponent,
    AfftechComponent,
    AddEditRecetteComponent,
    AddEditEditRecetteComponent,
    ListeRecetteComponent,
    ListeAfftechComponent,
    AddEditFichetechComponent,
    AddEditEditFichetechComponent,
    ListeFichetechComponent,
    ListAfftecComponent,
    ProduitListeComponent,
    ListeProdComponent,
    AccueilComponent,
    FactureComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatNativeDateModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    NgxPrintModule,
    ReactiveFormsModule,

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule,

    ToastrModule.forRoot(
      /* {
        timeOut : 2000,
        progressBar : true,
        progressAnimation : 'decreasing',
        preventDuplicates : true,
      } */
    ),
    MatProgressBarModule,
    FontAwesomeModule,
    HttpClientXsrfModule.withOptions({cookieName : 'csrftoken'})
  ],
  providers: [
    LoginService,
    LoginGuard,
    DatePipe,

    {provide : LOCALE_ID, useValue : 'fr-FR'},MessagingService,AsyncPipe,FilterPipe,LimitToPipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MatDatepickerModule,
    {provide : HTTP_INTERCEPTORS , useClass : HttpXsrfInterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
