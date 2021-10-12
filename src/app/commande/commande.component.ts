import { Component, LOCALE_ID, OnInit, HostBinding , PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from './commande.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ingredientStock, panier} from '../data';
import { ClientService } from '../client/client.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { trigger , state , style , animate , transition , } from '@angular/animations';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ParametreService } from '../parametre/parametre.service';
import { HeaderService } from '../header/header.service';
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons';

import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { AlertService } from '../service/alert.service';
import { IngredientService } from '../services/ingredient.service';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  animations: [
    trigger('fadeannimation', [
      state('in' , style({opacity : 1 , transform: "scaleY(1)"})),
      transition(':enter' , [
        style({opacity : 0 , transform: "scaleY(0)"}),
        animate(300)
      ]),
      transition(':leave',
      animate(300, style({opacity : 0 , transform: "scaleY(0)"})))
    ])
  ],
  providers: [
    CommandeService, DecimalPipe
  ]
})
export class CommandeComponent implements OnInit {
  categorie = [{}];
  produit:any[] = [{id : "" , nom : "test" , prix : 0 , categorie : {nomCate : ""} , cover : ""}];
  table = [{ id : 1 , nom : 'test' }];
  active : any;
  nbQuantite : any;
  display:boolean = true;
  panelClient : boolean = true;
  idTable : any;
  panier : any = panier;
  totalAddition : number = 0;
  show = true;
  date : any;
  selectedClient: any;
  nbClient : any;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  client : ClientFace[] = [{id : 1 , nom : 'test' , prenom : 'test' , adresse : 'test' , tel : 0 , point : 0}];
  bonus : number;
  check : any;
  isOpen = true;
  todayFace : number = Date.now();
  hide = true;
  controlType: string;
  clientPoint : any[] = [];
  faConciergeBell = faConciergeBell;
  heure : any;
  tel = "034 54 558 56";
  espece : any;
  rendu : any;
  factureCommande : any;
  searchResult: boolean = true;

  client$ : Observable<ClientFace[]>;
  filter : FormControl;
  nbCommande = 0;
  facture;
  factureList;

  factureFormat : any;
  ingredientStock :any;
  recetteProduit: any[] = [{id : 1 , quantite_ingredient: 0.5}];
  recetteP: any[] = [{id : 1 , quantite_ingredient: 0.5}];
  nbDispo;
  tableau;

  constructor(
    private pipe: DecimalPipe,
    private api: CommandeService,
    private modalService: NgbModal,
    private router:ActivatedRoute,
    private apiParam:ParametreService,
    private apiClient:ClientService,
    private toastr: ToastrService,
    private apiHead: HeaderService,
    public dialog: MatDialog ,
    public sweet: AlertService,
    private apiIngre : IngredientService,
    private apiRec: SharedService)
  {
    this.getCategorie();
    this.getClient();
    this.selectedClient = {id : -1 , nom : '', prenom : ''};
    this.filter = new FormControl('');
    this.nbItem = 5;

    this.date = new Date().toLocaleDateString();
    this.horloge();

  }

  getStock(){
    this.apiIngre.getAll().subscribe(
      data => {
        this.ingredientStock = data;
        console.log(ingredientStock.length , 'length')
        if(ingredientStock.length==0){
          this.ingredientStock.forEach(element => {
            ingredientStock.push(element)
          });
          console.log(ingredientStock , 'Ingredient globale')
        this.getNombre();
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  getNombre(){
    this.nbDispo = {};
    var j:any;
    for(j = 0 ; j < this.produit.length ; j++){

      this.apiRec.getProduitRe(this.produit[j].id).subscribe(
        data => {

          this.tableau = [];
          this.recetteProduit = data;
          // console.log(this.recetteProduit , 'Recette')

          var i:any;
          for(i = 0; i< this.recetteProduit.length ; i++){
            var proId = this.recetteProduit[i].produit.id;
            // console.log(proId , 'Name')
            var index = ingredientStock.findIndex((e) => {
              return e.id == this.recetteProduit[i].ingredient.id;
            });
            if(index > -1 ){
              var a  = Math.floor(ingredientStock[index].quantite_stock/this.recetteProduit[i].quantite_ingredient);
              console.log(a , 'nombre vita')
              this.tableau.push(a);
              console.log(this.nbDispo[proId] , 'tableau')

            }
            this.nbDispo[proId] = this.myMinArray(this.tableau);
          }
          console.log(this.nbDispo[proId] , 'dispo')

        },
        error => {
          console.log(error);
        }
      )
    }
  }

  getDisponibilite(id:any , nb:any){
    var indexe = this.produit.findIndex((e) => {
      return e.id == id
    });
    if(indexe > -1 ){
      this.apiRec.getProduitRe(this.produit[indexe].id).subscribe(
        data => {
          this.tableau = [];
          this.recetteP = data;

          var i:any;
          for(i = 0; i< this.recetteP.length ; i++){

            var index = ingredientStock.findIndex((e) => {
              return e.id == this.recetteP[i].ingredient.id;
            });
            if(index > -1 ){
              var aa = ingredientStock[index].quantite_stock - (this.recetteP[i].quantite_ingredient * nb)
              if(aa >= 0){
                ingredientStock[index].quantite_stock = aa;
                console.log(ingredientStock , 'stock sisa');
                this.getNombre();
              }else{
                alert('stcok insufisant')
              }


            } else {
              alert('Ingredient non disponible pour cette produit')
            }
          }
        },
        error => {
          console.log(error);
        }
      )

    }
  }

  retirerStock(id:any , table:any){
    var indexe = this.panier[table].findIndex((e) => {
			return e.id == id;
		});
    if(indexe > -1 ){
      var qte = this.panier[table][indexe].quantite
      this.apiRec.getProduitRe(this.panier[table][indexe].id).subscribe(
        data => {
          this.tableau = [];
          this.recetteP = data;

          var i:any;
          for(i = 0; i< this.recetteP.length ; i++){

            var index = ingredientStock.findIndex((e) => {
              return e.id == this.recetteP[i].ingredient.id;
            });
            if(index > -1 ){
              var aa = ingredientStock[index].quantite_stock + (this.recetteP[i].quantite_ingredient * qte)
                ingredientStock[index].quantite_stock = aa;
                console.log(ingredientStock , 'stock napina');
                this.getNombre();

            } else {
              alert('Ingredient non disponible pour cette produit')
            }
          }
        },
        error => {
          console.log(error);
        }
      )

    }
  }

  search(text: string, pipe: PipeTransform): ClientFace[] {
    return this.client.filter(country => {
      const term = text.toLowerCase();
      return country.nom.toLowerCase().includes(term)
          || country.prenom.toLowerCase().includes(term)
          || country.adresse.toLowerCase().includes(term)
          || pipe.transform(country.tel).includes(term)
    });
  }

  ajoutFacture(facture){
    this.api.ajoutFacture(facture).subscribe(
      data => {
        this.getFacture();
      },
      error=>{
        console.log(error);
      }
    )
  }

  getFacture(){
    this.api.getFacture().subscribe(
      data => {
        this.factureList = data;
        this.myArrayMax(this.factureList);
      }
    )
  }

  myArrayMax(arr) {
    arr.sort(function(a, b){return a.id - b.id});
    this.facture = arr[arr.length - 1].id*1;
    console.log(this.facture,' nombre fature')
    var i;
    for(i = 0;i < panier[this.idTable].length; i++){
      console.log(this.facture , 'factiora isa')
      this.api.IngreMoins(panier[this.idTable][i], this.date , this.facture).subscribe(
        data => {
          this.display = true;
          this.panelClient = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  myMinArray(arr) {
    return Math.min.apply(null, arr);
  }

  afficher ():void {
    if(this.display == true && this.panelClient == false){
      this.printFacture();
      this.retirerValider(this.idTable);
      this.nbCommande = 0;
    }
    if(this.display == false){
      this.display = true;
      this.panelClient = true;
    }else {
      this.display = false;
      if(this.panelClient == false && this.display == false){
        this.panelClient = true;
        this.display = true
      }
    }
  }

  dispalyClient (){
    if(this.display == true && this.panelClient == false){
      this.printFacture();
      this.retirerValider(this.idTable);
      this.nbCommande = 0;
    }
    if(this.panelClient == false){
      this.panelClient = true;
      this.display = true;
    }else{
      this.panelClient = false
      this.display = true;
    }
  }


  getCategorie = () => {
    this.api.getAllCategorie().subscribe(
      data => {
        this.categorie = data;
        this.active = data[0].nomCate;
        this.getProduit(data[0].id)
        this.getStock();
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

  getClient = () => {
    this.check = {};
    this.apiClient.getAllClient().subscribe(
      data => {
        this.client = data;
        this.client$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe)),
        );
        this.client$.subscribe(
          data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
        )
        data.forEach(element => {
          this.check[element.id] = element.id;
        });
        for(var i = 0 ; i < data.length ; i++){
          if(data[i].point >= 10){
            this.clientPoint.push(data[i]);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  close(id) {
    var index = this.clientPoint.findIndex((e) => {
      return e.id == id;
    });
    if(index > -1 ){
      this.clientPoint = [...this.clientPoint.slice(0, index), ...this.clientPoint.slice(index + 1)];
    }

  }
  updateBonus(){
    this.bonus = 0;
    this.apiParam.getBonus().subscribe(
      data => {
        for(var i = 0 ; i < data.length ; i++){
          if(data[i].min <= this.totalAddition && this.totalAddition < data[i].max){
            this.bonus = data[i].point;
            console.log(this.bonus);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ajoutClient = () => {
    this.apiClient.ajoutClient(this.selectedClient, this.bonus).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    );
  }

  updateClientBonus = (client:any , bonus:any) => {
    this.apiClient.updateClientBonus(client , bonus).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
  }

  getProduit = (cate:any) => {
    this.nbQuantite = {};
    this.api.getProduit(cate).subscribe(
      data => {
        this.produit = data;
        this.getNombre();
        data.forEach(element => {
          this.nbQuantite[element.id] = 0;
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  ingredientMoins = () => {
    this.api.ajoutCommande(panier[this.idTable][0], this.date , 3).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

  getTable = (id:any) => {
    this.api.getTable(id).subscribe(
      data => {
        this.table = data;
        console.log(this.table[0].nom)
      },
      error => {
        console.log(error);
      }
    );
  }

  onCheck(id: any):void {
    var index = this.client.findIndex((e) => {
			return e.id == this.check[id];
		});

    if(index > -1 ){
      var text = 'choisir cette client?';
      this.sweet.alertQuestion(text)
      .then((result) => {
            if(result.value){
              var i;
              for(i = 0;i < panier[this.idTable].length; i++){
                this.api.ajoutCommandeClient(panier[this.idTable][i] , this.client[index] , this.date).subscribe(
                  data => {
                    this.retirerValider(this.idTable);
                    this.display = true;
                    this.panelClient = true;
                    this.toastr.info("Commande reussi");
                    if(this.client[index].point*1 + this.bonus*1 > 9){
                      this.apiHead.nbTest.push(this.client[index])
                      this.apiHead.display = true;
                    }
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
              this.updateClientBonus(this.client[index] , this.client[index].point*1 + this.bonus*1);
              this.printFacture();
            }
      })
		}
  }


  plus(idVariable: any):void {
    if(this.nbQuantite[idVariable] < this.nbDispo[idVariable]){
      this.nbQuantite[idVariable] = this.nbQuantite[idVariable] + 1;
    }

  }
  moins(idVariable: any):void {
    if(this.nbQuantite[idVariable] > 0){
      this.nbQuantite[idVariable] = this.nbQuantite[idVariable] - 1;
    }
  }

  ajoutpanier(id : any, nom : any, prix : any, categorie : any, quantite : any, table :any):void {
    var item : any = {
      id : id,
      nom : nom,
      categorie : categorie,
      prix : parseInt(prix),
      quantite : parseInt(quantite),
      net : prix * quantite
    }

    !panier[table] ? panier[table] = [] : "";

    var index : any = panier[table].findIndex((e) => {
      return e.id == item.id;
    });

    if(index > -1 ){
      panier[table][index].quantite += item.quantite;
      panier[table][index].net = panier[table][index].prix * panier[table][index].quantite;
    }else{
      panier[table].push(item);
    }

    this.nbQuantite[id] = 0;
    this.nbCommande = panier[this.idTable].length;
    console.log(panier);
  }

  retirer(table : any,id : any) : void {
    var index = this.panier[table].findIndex((e) => {
			return e.id == id;
		});
		if(index > -1 ){
			this.panier[table] = [...panier[table].slice(0, index), ...panier[table].slice(index + 1)];
		}
    this.total(table);
    this.nbCommande = panier[this.idTable].length;
  }

  total(table : any) : void{
    var i;
    this.totalAddition = 0;
      for(i = 0; i < panier[table].length ; i++){
        this.totalAddition = this.totalAddition + panier[table][i].net;
        this.updateBonus();
      }
  }

  validerCommande = () => {
    if(panier[this.idTable].length > 0){
      this.sweet.alertInput()
      .then((result) => {
        if(result.isConfirmed){
          this.espece = result.value;
          var pattern = /^[0-9]*$/;
          if(this.espece == null || this.espece == '' || !pattern.test(this.espece)){
            var erreurText = 'Il y a une erreur de saisie'
            this.sweet.alertErreur(erreurText)
          }else{
            this.rendu = this.espece - this.totalAddition;
            if(this.rendu >= 0){

              var confirmText = 'valider cette commande?<br>'+
              'Total : '+this.totalAddition.toLocaleString('ru-RU')+' Ar<br>'+
              'Billet : '+(this.espece * 1).toLocaleString('ru-RU')+' Ar<br>'+
              'Rendu : '+this.rendu.toLocaleString('ru-RU')+' Ar';
              this.sweet.alertQuestion(confirmText)
              .then((result) => {
                if(result.isConfirmed){

                  this.factureCommande = {
                    heure : this.heure,
                    date : this.date,
                    total : this.totalAddition,
                    billet : this.espece,
                    rendu : this.rendu
                  }

                  this.ajoutFacture(this.factureCommande);
                }
              })
            }else{
              var erreur = "Le montant qui a été saisie n'est pas suffisant"
              this.sweet.alertErreur(erreur)
            }
          }
        }
      })
    }

  }

  validerClient = () => {
    Swal.fire({
      title : "Etes-vous sur?",
      text : "de valider cette commande et enregistrer le client",
      icon : "warning",
      showCancelButton : true,
      confirmButtonText : "Oui",
      cancelButtonText : "Non"
    }).then((result) => {
      if(result.value){
        var i;
        for(i = 0;i < panier[this.idTable].length; i++){
          var a = "2045-12-12"
          this.api.ajoutCommandeClient(panier[this.idTable][i] , this.selectedClient , this.date).subscribe(
            data => {
              this.retirerValider(this.idTable);
              this.display = true;
              this.panelClient = true;
              this.toastr.success("Commande reussi","Commande");
            },
            error => {
              console.log(error);
            }
          );
        }
        this.ajoutClient();
        this.printFacture();
      }
    })

  }

  retirerValider(id : any) : void {
    Reflect.deleteProperty(panier,id);
    this.totalAddition = 0;

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  horloge= () => {
    var t = new Date().toLocaleTimeString()
    this.heure = t;
    setTimeout(this.horloge, 1000);
  }

  printFacture() : void {
    let Html =
    `
    <div class="" style="white-space: nowrap;">
      <div class="" style="margin-top : 10px;">
        <div style="width : 70px !important ; margin-top : 15px;">
          <img src="assets/img/logoFacture.png" alt="image" style="width:100% ; height:50px !important"/><br>
          <span style="font-size: 12px !important; margin-top : -20px !important;margin-left : 5px ;">Numero: <b>${this.facture}</b></span>
        </div>
        <div style="margin-top : -75px ; margin-left : 85px;font-size : 11px !important;">
          <p>${this.date} ${this.heure}</p>
          <p style="margin-top : -17px !important;">Tél: ${this.tel}</p>
          <p style="margin-top : -17px !important;">kairos@gmail.com</p>
          <p style="margin-top : -17px !important;">Anjorozorona</p>
        </div>
        <div style="margin-top : 5px;margin-bottom:5px;">
          <table>
            <thead>
              <tr style='font-size : 10px !important;'>
                <th>Désignation&nbsp;&nbsp;</th>
                <th>Prix_U&nbsp;&nbsp;</th>
                <th>Qté&nbsp;&nbsp;</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
            `
            for(let i=0 ; i < panier[this.idTable].length ; i++){
              Html +=
              `<tr style='font-size : 10px !important;'>`+
                `<td>${panier[this.idTable][i].categorie} ${panier[this.idTable][i].nom}</td>`+
                `<td>${panier[this.idTable][i].prix.toLocaleString('ru-RU')}Ar</td>`+
                `<td style="text-align : center">${panier[this.idTable][i].quantite}</td>`+
                `<td>${panier[this.idTable][i].net.toLocaleString('ru-RU')}Ar</td>`+
              `</tr>`+
            ``}
            Html +=
            `
            </tbody>
          </table>
        </div>

        <div style="width:300px !important;font-size : 12px !important;">
          <table>
            <tr>
              <td><strong>Total </strong></td>
              <td>: </td>
              <td><strong> ${this.totalAddition.toLocaleString('ru-RU')} Ar </strong></td>
            </tr>
            <tr>
              <td>Billet </strong></td>
              <td>: </td>
              <td> ${(this.espece*1).toLocaleString('ru-RU')} Ar </td>
            </tr>
            <tr>
              <td>Rendu </td>
              <td>: </td>
              <td>${this.rendu.toLocaleString('ru-RU')} Ar </td>
            </tr>
          </table>
        </div>
      </div>
      <div style="text-align: center !important;">
        <span style='font-size : 10px !important;margin-left : 18px'>Merci pour votre visite ! A bientot</span>
      </div>
    </div>
    `




    this.api.print(Html);
  }
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
       this.idTable = params.idTable;
    });
    this.getTable(this.idTable);
    this.total(this.idTable);
    this.nbCommande = panier[this.idTable].length;
  }


}

interface ClientFace {
  id:number;
  nom: string;
  prenom: string;
  adresse: string;
  tel:number;
  point : number;
}
