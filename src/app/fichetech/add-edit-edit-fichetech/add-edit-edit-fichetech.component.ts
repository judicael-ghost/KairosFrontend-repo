import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-edit-edit-fichetech',
  templateUrl: './add-edit-edit-fichetech.component.html',
  styleUrls: ['./add-edit-edit-fichetech.component.css']
})
export class AddEditEditFichetechComponent implements OnInit {

  constructor(private service:SharedService , private apiIngre: IngredientService) { }
  message= '';
  submit= false;
  @Input() rec:any;
  id?: any;
  quantite_ingredient?:number;
  //produit?:string;
  ingredient?:string;
  listRec?: any[];
  listIngred?: any[];
  //listProd?: any[];

  ngOnInit(): void {
    //this.selecteProduit(),
    this.selecteIngredient()
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
    "ingredient":this.rec.ingredient.id,
    "produit":this.rec.produit.id
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
  this.ingredient=this.rec.ingredient.id;
}


}
