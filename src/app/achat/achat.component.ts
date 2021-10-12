import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommandeService } from '../commande/commande.service';
import { ProduitService } from '../produit/produit.service';
import { AchatService } from './achat.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css'],
  providers: [DecimalPipe]
})
export class AchatComponent implements OnInit {
  commande : CommandeFace[] = [{id : 1 , nom : 'test' , categorie : 'test' , prix : 0 , quantite : 0 , net : 0 , date : '1/1/2020' ,table : 'test', facture : 0}];
  totalLength : any;
  page : number = 1;
  nbItem : any;
  searchResult: boolean = true;

  commande$ : Observable<CommandeFace[]>;
  filter : FormControl;

  d = new Date();
  day;
  month;
  year;
  datepicker = {
    dateDebut: new Date(),
    dateFin: new Date()
  }

  recetteJour = 0;
  recetteDate = 0;
  commandeJour = 0;
  commandeDate = 0;

  factureListe;
  commandeListe;

  factureglobale = {}

  tableau:any[] = [];
  max = 0;
  min = 0;
  nameMax;
  nameMin;
  nbProduitCom  = 0;
  constructor(private pipe: DecimalPipe , private api: AchatService , private apiCom: CommandeService , private apiPro: ProduitService) {
    this.filter = new FormControl('');
    this.nbItem = 5;
    this.getCommande();
    this.getDay();
    this.allCommande();
  }

  getDay(){
    this.day = this.d.getDate()
    this.month = this.d.getMonth()*1 + 1
    this.year = this.d.getFullYear()
    this.datepicker = {
      dateDebut: new Date(this.month+"/"+this.day+"/"+this.year),
      dateFin: new Date(this.month+"/"+this.day+"/"+this.year)
    }
  }

  allCommande(){
    this.apiPro.getAllCommande().subscribe(
        data => {
          for(var i =0 ; i < data.length ; i++){
            var item = {
              "name" : data[i].categorie+" "+data[i].nom,
              "value" : data[i].quantite
            }
            var index : any = this.tableau.findIndex((e) => {
              return e.name == item.name;
            });

            if(index > -1 ){
              this.tableau[index].value = this.tableau[index].value*1 + item.value*1;
            }else{
              this.tableau.push(item);
            }

          }
            console.log('tableau : ',this.tableau)
            this.nbProduitCom = this.tableau.length;
            this.myArrayMax(this.tableau);
      }
    )

  }
  myArrayMax(arr) {
    arr.sort(function(a, b){return a.value - b.value});
    this.max = arr[arr.length - 1].value;
    this.nameMax = arr[arr.length - 1].name;
    this.min = arr[0].value;
    this.nameMin = arr[0].name;
  }

  getCommande = () => {
    this.api.getAllCommande().subscribe(
      data => {
        this.commande = data;
        this.commande$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe)),
        );
        this.commande$.subscribe(
          data => {
            this.commandeDate = data.length;
            data.length == 0 ? this.searchResult = false : this.searchResult = true

          }
        )
      },
      error => {
        console.log(error);
      }
    );
  }

  getFacture(){
    this.apiCom.getFacture().subscribe(
      data => {
        this.factureListe = data;
        var i;
        for(i = 0 ; i < this.factureListe.length -1 ; i++){
          this.apiCom.getOneFacture(this.factureListe[i].id).subscribe(
            data => {
              this.commandeListe = data;
              console.log(this.commandeListe, 'commande par facture')
            },
            error => {
              console.log(error)
            }
          )

        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getOneFacture(id:any){
    this.apiCom.getOneFacture(id).subscribe(
      data => {
        this.commandeListe = data;
        console.log(this.commandeListe, 'commande par facture')
      },
      error => {
        console.log(error)
      }
    )
  }

  getParDate(){
    this.commande$.subscribe(
      data => {
        this.commandeDate = data.length;
      }
    )
  }
  getDate(){
    console.log(this.datepicker)
  }

  search(text: string, pipe: PipeTransform): CommandeFace[] {
    return this.commande.filter(country => {
      const term = text.toLowerCase();
      return country.categorie.toLowerCase().includes(term)
          || country.nom.toLowerCase().includes(term)
          || pipe.transform(country.prix).includes(term)
          || pipe.transform(country.quantite).includes(term)
          || pipe.transform(country.net).includes(term)
          || country.date.toLowerCase().includes(term)
    });
  }

  filterDate(){
    this.commande.filter(data => new Date(data.date) > this.datepicker.dateDebut && new Date(data.date) < this.datepicker.dateFin)
  }

  ngOnInit(): void {
  }


}
interface CommandeFace {
  id:number;
  nom: string;
  categorie: string;
  prix: number;
  quantite:number;
  net:number;
  date:string;
  table : string;
  facture : number;
}
