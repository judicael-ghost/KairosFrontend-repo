import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit/produit.service';

@Component({
  selector: 'app-produit-liste',
  templateUrl: './produit-liste.component.html',
  styleUrls: ['./produit-liste.component.css']
})
export class ProduitListeComponent implements OnInit {

  constructor(private service:ProduitService) { }
  ProdList:any=[];

  ngOnInit(): void {
    this.refreshProdList();
  }

   refreshProdList(){
     this.service.getProduit().subscribe(data=>{
       this.ProdList=data;
     });
   }


}
