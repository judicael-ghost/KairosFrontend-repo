import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  ingredients?: Ingredient[];
  listeVide= false;
  message: any;
  nomIngredients: any;
  result: any;

  constructor(private servise: IngredientService,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.retrieveIngredients();
  }

  retrieveIngredients(): void {
    timer(0, 300000).subscribe(() => {
    this.servise.getnotification()
    .subscribe(
      data => {
        let count = 0;
        this.ingredients = data;
        this.result = data;
     if (data.length == 0) {
          this.listeVide=false;
        }else{
          this.ingredients = data;
          this.listeVide=true;

            for (const iterator of data) {
              this.message=iterator.nom_ingredient;
              this.notifyService.showWarning("Quantite en stock base",this.message)
           }

        }


        console.log(data);
      },
      error => {
        console.log(error);
      });
    });

  }


}




  //count++
         /*  while (count < data.length) {
            this.message = this.result[count];
            this.notifyService.showWarning("Quantite en stock base",this.message.nom_ingredient);
          } */
         /*  for (let index = 0; index < data.length; index++) {
            this.message = data[index];
            this.notifyService.showWarning("Quantite en stock base",this.message.nom_ingredient);
          } */
          //this.nomIngredients = this.result.map((ingred: any) => ingred.nom_ingredient);
         /*  for (const iterator of data) {
            this.message=iterator.nom_ingredient;
            this.notifyService.showWarning("Quantite en stock base",this.message)
          } */
         /*  this.message =this.result[count];
          this.notifyService.showWarning("Quantite en stock base",this.message.nom_ingredient); */
