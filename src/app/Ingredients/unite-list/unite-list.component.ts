import { Component, OnInit } from '@angular/core';
import { Unite } from 'src/app/modele/unite.model';
import { UniteService } from 'src/app/services/unite.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-unite-list',
  templateUrl: './unite-list.component.html',
  styleUrls: ['./unite-list.component.css']
})
export class UniteListComponent implements OnInit {

  unites?: Unite[];
  totalLength : any;
  page : number = 1;
  nbItem : any;

  searchResult: boolean = true;
  constructor(private servise: UniteService , public api:StockMenuService) {
    this.nbItem = 10;
  }

  ngOnInit(): void {
    this.retrieveUnites();
    this.api.active = 3;
  }

  retrieveUnites(): void {
    this.servise.getAll()
      .subscribe(
        data => {
          this.unites = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUnites();
  }

}
