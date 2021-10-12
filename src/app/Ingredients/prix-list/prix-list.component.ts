import { Component, OnInit } from '@angular/core';
import { Prix } from 'src/app/modele/prix.model';
import { PrixService } from 'src/app/services/prix.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-prix-list',
  templateUrl: './prix-list.component.html',
  styleUrls: ['./prix-list.component.css']
})
export class PrixListComponent implements OnInit {

  prixs?: Prix[];
  totalLength : any;
  page : number = 1;
  nbItem : any;

  searchResult: boolean = true;
  constructor(private servise: PrixService , public api:StockMenuService) {
    this.nbItem = 10;
  }

  ngOnInit(): void {
    this.retrievePrix();
    this.api.active = 5;
  }

  public money_form(price: any){
    let money=parseFloat(price);
    let parts = money.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }

  retrievePrix(): void {
    this.servise.getAll()
      .subscribe(
        data => {
          this.prixs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePrix();
  }

}
