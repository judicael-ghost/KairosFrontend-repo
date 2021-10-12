
import { Component, OnInit, Input } from '@angular/core';
import { ProduitService } from 'src/app/produit/produit.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-edit-recette',
  templateUrl: './add-edit-recette.component.html',
  styleUrls: ['./add-edit-recette.component.css']
})
export class AddEditRecetteComponent implements OnInit {

  constructor(private service:SharedService , private apiProd : ProduitService , private apiIngre: IngredientService) { }
  message= '';
  submit= false;
  @Input() rec:any;
  id?: any;
  quantite_ingredient?:number;
  produit?:string;
  ingredient?:string;
  listRec?: any[];
  listIngred?: any[];
  listProd?: any[];

  ngOnInit(): void {
    this.id= 0;
    //this.quantite_ingredient=0;
    this.produit='';
    this.ingredient='';
    this.selecteProduit(),
    this.selecteIngredient()
  }

  selecteProduit(): void{
    this.apiProd.getProduit().subscribe(data =>{
      console.log("produit",data);
      this.listProd = data;
      console.log("produit list",this.listProd);

    },error =>{
      console.log(error);}
      );
    }

 selecteIngredient(): void{
  this.apiIngre.getAll().subscribe(data =>{
    console.log("ingredient",data);
    this.listIngred = data;
    console.log("ingredient list",this.listIngred);
  },error =>{
    console.log(error);
  } );
}

addRec(){
  const data = {
    "quantite_ingredient":this.quantite_ingredient,
    "produit":this.produit,
    "ingredient":this.ingredient
  }
  this.service.addRec(data).subscribe(res=>{
    console.log(res);
    if(res.message){
      this.message = res.message
      this.submit=true;
    }else{
      this.submit= true;
      this.message= 'Ajouter avec succés!!!';
    }
  });
}

}
