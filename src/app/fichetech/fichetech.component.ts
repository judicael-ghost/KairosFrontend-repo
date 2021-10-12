import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit/produit.service';

@Component({
  selector: 'app-fichetech',
  templateUrl: './fichetech.component.html',
  styleUrls: ['./fichetech.component.css']
})
export class FichetechComponent implements OnInit {

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
