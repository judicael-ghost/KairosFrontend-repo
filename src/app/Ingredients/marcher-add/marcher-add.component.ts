import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { Lieu } from 'src/app/modele/lieu.model';
import { MarcherCrud } from 'src/app/modele/marcher.model';
import { Prix } from 'src/app/modele/prix.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { LieuService } from 'src/app/services/lieu.service';
import { MarcherService } from 'src/app/services/marcher.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PrixService } from 'src/app/services/prix.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-marcher-add',
  templateUrl: './marcher-add.component.html',
  styleUrls: ['./marcher-add.component.css']
})
export class MarcherAddComponent implements OnInit {

  ingredients?: Ingredient[];
  lieux?: Lieu[];
  prix?: Prix[];
  marcher: MarcherCrud = {
    ingredient: '',
    lieu: '',
    prix: ''
  };
  submitted = false;
  message= '';

  constructor(public api:StockMenuService, private notifyService : NotificationService,private service: MarcherService,private ingredientservice: IngredientService,private lieuservice: LieuService,private prixservice: PrixService) { }

  ngOnInit(): void {
    this.retrieveIngredients();
    this.retrieveLieux();
    this.retrievePrix();
    this.api.active = 6;
  }

  retrieveIngredients(): void {
    this.ingredientservice.getAll()
      .subscribe(
        data => {
          this.ingredients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveLieux(): void {
    this.lieuservice.getAll()
      .subscribe(
        data => {
          this.lieux = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePrix(): void {
    this.prixservice.getAll()
      .subscribe(
        data => {
          this.prix = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  saveMarcher(): void {
    const data = {
      ingredient: this.marcher.ingredient,
      lieu: this.marcher.lieu,
      prix: this.marcher.prix
    };

    this.service.create(data)
      .subscribe(
        response => {
          if(!response.message){
            console.log(response);
            this.notifyService.showSuccess("Votre donnée est enregitrer!!", "Notification")
            this.submitted = true;
          }else{
            console.log(response);
            this.message=response.message
            this.notifyService.showWarning(this.message, "Notification")
            this.submitted = false;
            this.marcher = {
              ingredient: '',
              lieu: '',
              prix: ''
            };
          }

        },
        error => {
          console.log(error);
        });
  }

  newMarcher(): void {
    this.submitted = false;
    this.marcher = {
      ingredient: '',
      lieu: '',
      prix: ''
    };
  }

}
