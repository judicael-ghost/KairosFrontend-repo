import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit/produit.service';

@Component({
  selector: 'app-afftech',
  templateUrl: './afftech.component.html',
  styleUrls: ['./afftech.component.css']
})
export class AfftechComponent implements OnInit {

  constructor(private produit: ProduitService) { }
  ProdList:any=[];

  ngOnInit(): void {
    this.refreshProdList();
  }

   refreshProdList(){
     this.produit.getProduit().subscribe(data=>{
       this.ProdList=data;
     });
   }

}
