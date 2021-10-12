import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/modele/categorie.model';
import { AlertService } from 'src/app/service/alert.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {

  currentCategorie: Categorie = {
    nom_categorie: ''
  };
  message = '';

  constructor(
    private service: CategorieService,
    private route: ActivatedRoute,
    private router: Router,private notifyService : NotificationService,
    public api: StockMenuService,private sweet:AlertService) { }


  ngOnInit(): void {
    this.getCategorie(this.route.snapshot.params.id);
    this.api.active = 2;
  }

  getCategorie(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentCategorie = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCategorie(): void {
    this.message = '';

    this.service.update(this.currentCategorie.id, this.currentCategorie)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/categories/']);
        },
        error => {
          console.log(error);
        });
  }

  deleteCategorie(): void {
    var text = 'Supprimer cet Categorie?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentCategorie.id)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/categories/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
      }
    })
  }



}

