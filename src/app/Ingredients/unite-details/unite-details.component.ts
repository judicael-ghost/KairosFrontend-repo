import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unite } from 'src/app/modele/unite.model';
import { AlertService } from 'src/app/service/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UniteService } from 'src/app/services/unite.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-unite-details',
  templateUrl: './unite-details.component.html',
  styleUrls: ['./unite-details.component.css']
})
export class UniteDetailsComponent implements OnInit {

  currentUnite: Unite = {
    nom_unite: '',
    symbol: ''
  };
  message = '';

  constructor(
    private service: UniteService,
    private route: ActivatedRoute,
    private router: Router,private notifyService : NotificationService,
    public api: StockMenuService , private sweet:AlertService) { }


  ngOnInit(): void {
    this.getUnite(this.route.snapshot.params.id);
    this.api.active = 3;
  }

  getUnite(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentUnite = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUnite(): void {
    this.message = '';

    this.service.update(this.currentUnite.id, this.currentUnite)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/unites/']);
        },
        error => {
          console.log(error);
        });
  }

  deleteUnite(): void {
    var text = 'Supprimer cet Unité?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentUnite.id)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
          this.router.navigate(['/unites/']);
        },
        error => {
          this.notifyService.showError("Something is wrong", "Notification")
          console.log(error);
        });
      }
    })
  }

}
