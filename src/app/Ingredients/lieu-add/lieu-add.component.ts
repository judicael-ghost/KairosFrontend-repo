import { Component, OnInit } from '@angular/core';
import { Lieu } from 'src/app/modele/lieu.model';
import { LieuService } from 'src/app/services/lieu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-lieu-add',
  templateUrl: './lieu-add.component.html',
  styleUrls: ['./lieu-add.component.css']
})
export class LieuAddComponent implements OnInit {

  lieu: Lieu = {
    nom_lieu: ''
  };
  submitted = false;

  constructor(private service: LieuService,private notifyService : NotificationService , public api:StockMenuService) { }

  ngOnInit(): void {
    this.api.active = 4;
  }
  saveLieu(): void {
    const data = {
      nom_lieu: this.lieu.nom_lieu,
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

  newLieu(): void {
    this.submitted = false;
    this.lieu = {
      nom_lieu: '',
    };
  }


}
