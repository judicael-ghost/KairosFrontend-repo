import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientService } from '../client/client.service';
import { CommandeService } from '../commande/commande.service';
import {datatest , databar} from '../data';
import { DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService , DecimalPipe]
})
export class DetailComponent implements OnInit {
  datatest = [];
  databar = [];
  dataCategorie:any [] = [];
  pie:any[] = [700,370];
  bar:any[] = [700,370];
  colorScheme = { domain : []};
  detail = [{nom : 'test'}];
  client : CommandeFace[] = [{categorie : 'test' , nomPro : 'test' , prix : 0 , quantite : 0 , net : 0 , date : 'test'}];
  categorie = [{nom : 'test'}];
  detailClient: any;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  countCommande : any [] = [{nom : 'test' , value : 10}];
  nomParams : any;
  telParams : any;
  Totaldepense : number = 0;
  bonusClient : any = 0;
  allCategorie : any[] = [];
  categorieDistinct:any[] = [];
  searchResult = true;

  donneBar = new BehaviorSubject([]);
  donnePie = new BehaviorSubject([]);

  client$ : Observable<CommandeFace[]>;
  filter : FormControl;



  constructor( private pipe: DecimalPipe ,private api: DetailService, private apiCli: ClientService , private apiCom: CommandeService ,private router:ActivatedRoute) {
    this.detailClient = {id : -1 , nom : '', prenom : '', adresse : '', tel : ''};
    this.nbItem = 10;
    this.filter = new FormControl('');

  }

  search(text: string, pipe: PipeTransform): CommandeFace[] {
    return this.client.filter(country => {
      const term = text.toLowerCase();
      return country.categorie.toLowerCase().includes(term)
          || country.nomPro.toLowerCase().includes(term)
          || pipe.transform(country.prix).includes(term)
          || pipe.transform(country.quantite).includes(term)
          || pipe.transform(country.net).includes(term)
          || country.date.toLowerCase().includes(term)
    });
  }

  getCategorie(){
    this.apiCom.getAllCategorie().subscribe(
      data => {
        this.categorie = data;

      },
      error => {
        console.log(error);
      }
    );
  }

  detailClicked = (id:any) => {

    this.api.getOneClient(id).subscribe(
      data => {
        this.detailClient = data;
        if(data.point == ''){
          this.bonusClient = 0;
        }else{
          this.bonusClient = data.point;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getClient = (nom:any,tel:any) => {
    this.apiCli.getAllCommandeClient(nom,tel).subscribe(
      data => {
        this.client = data;
        this.client$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe)),
        );
        this.client$.subscribe(
          data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
        )

        for(var i = 0 ; i < this.client.length ; i++){
          this.Totaldepense += this.client[i].net*1;
          this.allCategorie.push(data[i].categorie)
        }

        this.allCategorie.forEach(elem => {if(this.categorieDistinct.indexOf(elem) < 0) this.categorieDistinct.push(elem)})
        console.log('categorie ',this.categorieDistinct)
        this.PieCommandeClient(this.nomParams,this.telParams);
        this.BarCommandeClient(this.nomParams,this.telParams);
      },
      error => {
        console.log(error);
      }
    );
  }

  PieCommandeClient = (nom:any,tel:any) => {
    var tableau = [];

    for(var i = 0 ; i < this.categorieDistinct.length ; i++){
      this.apiCli.countAllCommandeClient(nom,tel,this.categorieDistinct[i]).subscribe(
        data => {
          this.countCommande = data
          console.log('data io : ', data)
          var nb = 0;
          for(var j=0 ; j < data.length ; j++){
            nb = nb*1 + data[j].quantite*1
            var item = {
              "name" : data[0].categorie,
              "value" : nb
            }
            if( j === data.length-1){
              tableau.push(item)
              console.log('tableau : ' , tableau)
              this.donnePie.next(tableau)
            }
          }


        },
        error =>{
          console.log(error);
        },
      );
    }
    this.donnePie.subscribe(
      data => {
        console.log('data :' ,data);
        if(data.length > 0){
          datatest.push(data[data.length-1])
          if(this.categorieDistinct.length == data.length){
            Object.assign(this , {datatest});
            console.log('datatest : ',datatest);
          }

        }

      }
    )

  }

  BarCommandeClient = (nom:any,tel:any) => {
    var tableau = [];

    for(var i = 0 ; i < this.categorieDistinct.length ; i++){
      this.apiCli.countAllCommandeClient(nom,tel,this.categorieDistinct[i]).subscribe(
        data => {
          this.countCommande = data
          var net = 0;
          for(var j=0 ; j < data.length ; j++){
            net = net*1 + data[j].net*1
            var item = {
              "name" : data[0].categorie,
              "value" : net
            }
            if( j === data.length-1){
              tableau.push(item)
              console.log('tableau :' , tableau)
              this.donneBar.next(tableau)
            }
          }




        },
        error =>{
          console.log(error);
        },
      );
    }
    this.donneBar.subscribe(
      data => {
        console.log('data :' ,data);
        if(data.length > 0){
          databar.push(data[data.length-1])
          if(this.categorieDistinct.length == data.length){
            Object.assign(this , {databar});
            console.log('databar : ',databar);
          }

        }

      }
    )

  }



  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      datatest.splice(0 , datatest.length);
      databar.splice(0 , databar.length);
      this.detailClicked(params.id);
      this.getClient(params.nom,params.tel);
      this.nomParams = params.nom;
      this.telParams = params.tel;
      this.getCategorie();


    })
  }

}
interface CommandeFace {
  categorie: string;
  nomPro: string;
  prix: number;
  quantite:number;
  net:number;
  date:string;
}
