import { Component, OnInit } from '@angular/core';
import { StockMenuService } from './stock-menu.service';

@Component({
  selector: 'app-stock-menu',
  templateUrl: './stock-menu.component.html',
  styleUrls: ['./stock-menu.component.css']
})
export class StockMenuComponent implements OnInit {

  constructor(public api:StockMenuService ) {
    this.activa();
   }

  activa(){
    if(this.api.active = 0){
      this.api.active = 1;
    }
  }
  ngOnInit(): void {

  }

}
