import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-add-edit-fichetech',
  templateUrl: './add-edit-fichetech.component.html',
  styleUrls: ['./add-edit-fichetech.component.css']
})
export class AddEditFichetechComponent implements OnInit {

  constructor(private apiUni : UniteService,private service:SharedService, private route: ActivatedRoute, private router: Router , private apiIngre: IngredientService) { }
  message= '';
  submit= false;
  @Input() rec?:any;
  id?: any;
  quantite_ingredient?:number;
  ingredient?:string;
  unite?:string;
  listRec?: any[];
  listIngred?: any[];
  RecList:any=[];
  listUnite : any;

  ngOnInit(): void {
    this.RefreshRecList();
    this.id= 0;
    this.get(this.route.snapshot.params.id);
    //this.quantite_ingredient=0;
    this.ingredient='';
    this.selecteIngredient();
    this.getUnite();
  }
  getUnite(){
    this.apiUni.getAll().subscribe(
      data => {
        this.listUnite = data;
      },
      error => {
        console.error(error);
      }
    )
  }
  get(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.listIngred = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
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

RefreshRecList(){
  this.service.getRecList().subscribe(data => {
   this.RecList=data;
    console.log(data)
    //this.catListWithoutFilter=data;
  });
  }

addFich(){
  const data = {
    "quantite_ingredient":this.quantite_ingredient,
    "ingredient":this.ingredient,
    "unite" : this.unite
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

