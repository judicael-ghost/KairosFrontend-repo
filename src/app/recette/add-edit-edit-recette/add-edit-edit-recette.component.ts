import { Component, OnInit, Input } from '@angular/core';
import { ProduitService } from 'src/app/produit/produit.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-add-edit-edit-recette',
  templateUrl: './add-edit-edit-recette.component.html',
  styleUrls: ['./add-edit-edit-recette.component.css']
})
export class AddEditEditRecetteComponent implements OnInit {

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
    this.selecteProduit(),
    this.selecteIngredient()
  }

  selecteProduit(): void{
    this.apiProd.getProduit().subscribe(data =>{
      console.log(data);
      this.listProd = data;
    })
 }

 selecteIngredient(): void{
  this.apiIngre.getAll().subscribe(data =>{
    console.log(data);
    this.listIngred = data;
  })
}

updateRec(){
  const data = {
    "quantite_ingredient":this.rec.quantite_ingredient,
    "produit":this.rec.produit.id,
    "ingredient":this.rec.ingredient.id
  }
this.service.updateRec(this.rec.id,data).subscribe(res=>{
console.log(res);
this.submit= true;
this.message= 'Modifie avec succés!!!';
},
error => {
console.log(error);
});
}

newmodify(): void{
  this.submit = false;
  this.id=this.rec.id;
  this.quantite_ingredient=this.rec.quantite_ingredient;
  this.produit=this.rec.produit.id;
  this.ingredient=this.rec.ingredient.id;
}


}

