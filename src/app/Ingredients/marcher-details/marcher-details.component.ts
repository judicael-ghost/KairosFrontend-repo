import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { Lieu } from 'src/app/modele/lieu.model';
import { Marcher } from 'src/app/modele/marcher.model';
import { Prix } from 'src/app/modele/prix.model';
import { AlertService } from 'src/app/service/alert.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { LieuService } from 'src/app/services/lieu.service';
import { MarcherService } from 'src/app/services/marcher.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PrixService } from 'src/app/services/prix.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-marcher-details',
  templateUrl: './marcher-details.component.html',
  styleUrls: ['./marcher-details.component.css']
})
export class MarcherDetailsComponent implements OnInit {

  ingredients?: Ingredient[];
  lieux?: Lieu[];
  prix?: Prix[];
  currentMarcher: Marcher = {
    ingredient: '',
    lieu: '',
    prix: ''
  };
  message = '';

  constructor(
    private route: ActivatedRoute,private sweet: AlertService,
    private router: Router,private notifyService : NotificationService,public api : StockMenuService,
    private service: MarcherService,private ingredientservice: IngredientService,private lieuservice: LieuService,private prixservice: PrixService) { }


  ngOnInit(): void {
    this.retrieveIngredients();
    this.retrieveLieux();
    this.retrievePrix();
    this.getMarcher(this.route.snapshot.params.id);
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


  getMarcher(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentMarcher = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateMarcher(): void {
    this.message = '';
    const data = {
      "ingredient": this.currentMarcher.ingredient.id,
      "lieu": this.currentMarcher.lieu.id,
      "prix": this.currentMarcher.prix.id
    }

    this.service.update(this.currentMarcher.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/marchers/']);
        },
        error => {
          console.log(error);
        });
  }

  deleteMarcher(): void {
    var text = 'Supprimer cet Marché?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentMarcher.id)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
          this.router.navigate(['/marchers/']);
        },
        error => {
          this.notifyService.showError("Something is wrong", "Notification")
          console.log(error);
        });
  }
})}

}

