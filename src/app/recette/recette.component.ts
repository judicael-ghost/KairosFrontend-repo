import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit/produit.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  constructor(private service:ProduitService) { }
 RecList:any=[];

  ngOnInit(): void {
    this.refreshRecList();
  }

   refreshRecList(){
     this.service.getProduit().subscribe(data=>{
       this.RecList=data;
     });
   }

}
