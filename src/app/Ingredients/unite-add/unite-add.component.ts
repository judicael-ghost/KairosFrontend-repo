import { Component, OnInit } from '@angular/core';
import { Unite } from 'src/app/modele/unite.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UniteService } from 'src/app/services/unite.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-unite-add',
  templateUrl: './unite-add.component.html',
  styleUrls: ['./unite-add.component.css']
})
export class UniteAddComponent implements OnInit {

  unite: Unite = {
    nom_unite: '',
    symbol: ''
  };
  submitted = false;

  constructor(private service: UniteService,private notifyService : NotificationService , public api:StockMenuService ) { }

  ngOnInit(): void {
    this.api.active = 3;
  }

  saveUnite(): void {
    const data = {
      nom_unite: this.unite.nom_unite,
      symbol: this.unite.symbol
    };

    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
        },
        error => {
          console.log(error);
        });
  }

  newUnite(): void {
    this.submitted = false;
    this.unite = {
      nom_unite: '',
      symbol: ''
    };
  }



}
