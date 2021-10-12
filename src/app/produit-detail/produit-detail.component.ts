import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProduitDetailService } from './produit-detail.service';
import {dataProduit} from '../data';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  pie:any[] = [700,250];
  pieProd:any[] = [600,250];
  datatest = [{name : "andrana" , value : 100},{name : "test" , value : 150}]
  produitDistinct:any[] = [];
  produit:any[] = [];
  dataProduit = [];
  donnePie = new BehaviorSubject([]);
  labelChart;
  id;

  constructor(private router:ActivatedRoute , private api:ProduitDetailService) {

  }

  getOneCategorie(id){
    this.api.getOneCategorie(id).subscribe(
      data => {
        this.ParCategorie(data.nomCate)
        this.labelChart = data.nomCate
      },
      error => {

      }
    )
  }

  ParCategorie(nom){
    var tableau = [];

    this.api.commandeParCategorie(nom).subscribe(
      data => {
        for(var i =0 ; i < data.length ; i++){
          var item = {
            "name" : data[i].nom,
            "value" : data[i].net
          }
          var index : any = tableau.findIndex((e) => {
            return e.name == item.name;
          });

          if(index > -1 ){
            tableau[index].value = tableau[index].value*1 + item.value*1;
          }else{
            tableau.push(item);
          }

          this.produit.push(data[i].nom)
        }
            this.produit.forEach(elem => {if(this.produitDistinct.indexOf(elem) < 0) this.produitDistinct.push(elem)})
            console.log('Produit : ',this.produitDistinct, 'tableau ', tableau)
            this.donnePie.next(tableau)
      }
    );


    this.donnePie.subscribe(
      data => {

        console.log('data : ' ,data);
        if(data.length > 0){
          dataProduit.push(...data);
          // dataProduit.push(data[data.length-1])

          console.log('data = ' +data.length+ '  produit = ' +this.produitDistinct.length)

          if(this.produitDistinct.length == data.length){
            Object.assign(this , {dataProduit});
            console.log('Data produit : ',dataProduit);
          }

        }

      }
    )
  }
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      dataProduit.splice(0 , dataProduit.length);
      this.id = params.id;
      this.getOneCategorie(params.id);
    })

  }

}
