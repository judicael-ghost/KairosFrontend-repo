import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/produit/produit.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-liste-prod',
  templateUrl: './liste-prod.component.html',
  styleUrls: ['./liste-prod.component.css']
})
export class ListeProdComponent implements OnInit {

  constructor(private apiProd: ProduitService) { }
  ProdList:any=[];

  ModalTitle!:string;
  activateAddEditProdComp:boolean=false;
  prod:any;
  ListCat?: any[];

  ngOnInit(): void {
    this.RefreshProdList();
    this.selecteCategorie();
  }


  RefreshProdList(){
    this.apiProd.getProduit().subscribe(
      data => {
        this.ProdList=data;
        console.log(data)
      },
      error =>{
        console.log(error);
      }
    );
  }
  selecteCategorie(): void{
    this.apiProd.getCategorie().subscribe(
      data =>{
        console.log(data);
        this.ListCat = data;
      }
    )
  }

}
