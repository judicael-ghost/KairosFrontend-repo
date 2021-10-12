import { Component, OnInit } from '@angular/core';
import { Prix } from 'src/app/modele/prix.model';
import { NotificationService } from 'src/app/services/notification.service';
import { PrixService } from 'src/app/services/prix.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-prix-add',
  templateUrl: './prix-add.component.html',
  styleUrls: ['./prix-add.component.css']
})
export class PrixAddComponent implements OnInit {


  prix: Prix = {
    prix_unitaire: ''
  };
  submitted = false;

  constructor(private service: PrixService,private notifyService : NotificationService , public api:StockMenuService) { }

  ngOnInit(): void {
    this.api.active = 5;
  }

  savePrix(): void {
    const data = {
      prix_unitaire: this.prix.prix_unitaire,
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

  newPrix(): void {
    this.submitted = false;
    this.prix = {
      prix_unitaire: '',
    };
  }

}
