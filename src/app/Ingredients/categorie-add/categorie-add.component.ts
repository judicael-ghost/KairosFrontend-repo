import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Categorie } from 'src/app/modele/categorie.model';
import { StockMenuService } from '../stock-menu/stock-menu.service';


@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.css']
})
export class CategorieAddComponent implements OnInit {

  categorie: Categorie = {
    nom_categorie: ''
  };
  submitted = false;

  constructor(private service: CategorieService,private router: Router,private notifyService : NotificationService , public api:StockMenuService) { }

  ngOnInit(): void {
    this.api.active = 2;
  }

  saveCategorie(): void {
    const data = {
      nom_categorie: this.categorie.nom_categorie
    };
    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCategorie(): void {
    this.submitted = false;
    this.categorie = {
      nom_categorie: ''
    };
  }

}
