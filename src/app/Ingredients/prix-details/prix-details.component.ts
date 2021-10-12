import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prix } from 'src/app/modele/prix.model';
import { AlertService } from 'src/app/service/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PrixService } from 'src/app/services/prix.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-prix-details',
  templateUrl: './prix-details.component.html',
  styleUrls: ['./prix-details.component.css']
})
export class PrixDetailsComponent implements OnInit {

  currentPrix: Prix = {
    prix_unitaire: '',
  };
  message = '';

  constructor(
    private service: PrixService,private sweet : AlertService,
    private route: ActivatedRoute,
    private router: Router,private notifyService : NotificationService , public api:StockMenuService) { }

  ngOnInit(): void {
    this.getPrix(this.route.snapshot.params.id);
    this.api.active = 5;
  }

  getPrix(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentPrix = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePrix(): void {
    this.message = '';

    this.service.update(this.currentPrix.id, this.currentPrix)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
          this.router.navigate(['/prix/']);
        },
        error => {
          this.notifyService.showError("Something is wrong", "Notification")
          console.log(error);
        });
  }

  deletePrix(): void {
    var text = 'Supprimer cet Prix?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentPrix.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/prix/']);
        },
        error => {
          console.log(error);
        });
  }
})}

}
