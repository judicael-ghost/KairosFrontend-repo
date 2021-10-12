import { Component, OnInit } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-liste-recette',
  templateUrl: './liste-recette.component.html',
  styleUrls: ['./liste-recette.component.css']
})
export class ListeRecetteComponent implements OnInit {

  constructor(private service:SharedService , private apiIngre:IngredientService) { }
  message= '';
  submit= false;
  RecList:any=[];

  ModalTitle!:string;
  activateAddEditRecComp:boolean=false;
  activateAddEditEditRecComp:boolean=false;
  rec:any;
  listIngred?: any[];
  ingredient?:string;

  ngOnInit(): void {
    this.RefreshRecList();
    this.ingredient='';
    this.selecteIngredient()
  }

  RefreshRecList(){
    this.service.getRecList().subscribe(data => {
     this.RecList=data;
      console.log(data)
      //this.catListWithoutFilter=data;
    });
    }

  addClick(){
         this.ModalTitle="Add Rec";
         this.activateAddEditRecComp=true;
    }

  editClick(item:any){
  this.rec =item;
  this.ModalTitle="Edit Rec";
  this.activateAddEditEditRecComp=true;
    }

    deleteClick(item:any){
      if(confirm('Are you sure??')){
        this.service.deleteRec(item.id).subscribe(data=>{
          console.log(data)
          this.RefreshRecList();
        })
      }

   }

  closeClick(){
  this.activateAddEditRecComp=false;
  this.RefreshRecList();
}

addRec(){
  const data = {
    "ingredient":this.ingredient
  }
  this.service.addRec(data).subscribe(res=>{
    console.log(res);
    if(res.message){
      this.message = res.message
      this.submit=true;
    }else{
      this.submit= true;
      this.message= 'Enregistrer avec succés!!!';
    }
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



  }
