import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Categorie } from 'src/app/modele/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories?: Categorie[];
  next!: string;
  previous!: string;
  transactionsUrl = "http://localhost:8000/categories/";
  cout!: number;
  limit!: number;
  nbrPage!: number;

  totalLength : any;
  page : number = 1;
  nbItem : any;
  searchResult: boolean = true;

  filter : FormControl;

  constructor(private servise: CategorieService , public api:StockMenuService) {
    this.filter = new FormControl('');
    this.nbItem = 5;
  }

  ngOnInit(): void {
    this.retrieveCategories();
    this.api.active = 2;
  }

  retrieveCategories(): void {
    this.servise.getAll()
      .subscribe(
        data => {
          this.categories = data;
         /*  this.cout = data.count;
          this.limit = 5;
          this.nbrPage = this.cout / this.limit;
          if (this.nbrPage<1) {
            this.nbrPage = 1;
          }
          if (data.next) {
            this.next = data.next;
          }

          if (data.previous) {
            this.previous = data.previous;
          } */
          console.log(data);
        },
        error => {
          console.log(error);
        });
     }

    refreshList(): void {
      this.retrieveCategories();
     /*  this.fetchNext();
      this.fetchPrevious(); */
    }

   /*  fetchNext() {
      this.retrieveCategories(this.next);
    }

    fetchPrevious() {
      this.retrieveCategories(this.previous);
    }
   */

}
