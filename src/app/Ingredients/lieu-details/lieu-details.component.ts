import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lieu } from 'src/app/modele/lieu.model';
import { AlertService } from 'src/app/service/alert.service';
import { LieuService } from 'src/app/services/lieu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrls: ['./lieu-details.component.css']
})
export class LieuDetailsComponent implements OnInit {

  currentLieu: Lieu = {
    nom_lieu: '',
  };
  message = '';

  constructor(
    private service: LieuService,
    private route: ActivatedRoute,private sweet : AlertService,
    private router: Router,private notifyService : NotificationService , public api:StockMenuService) { }

  ngOnInit(): void {
    this.getLieu(this.route.snapshot.params.id);
    this.api.active = 4;
  }

  getLieu(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentLieu = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateLieu(): void {
    this.message = '';

    this.service.update(this.currentLieu.id, this.currentLieu)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/lieux/']);
        },
        error => {
          console.log(error);
        });
  }

  deleteLieu(): void {
    var text = 'Supprimer cet Lieu?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentLieu.id)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", "Notification");
          this.router.navigate(['/lieux/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
  }
})

}

}
