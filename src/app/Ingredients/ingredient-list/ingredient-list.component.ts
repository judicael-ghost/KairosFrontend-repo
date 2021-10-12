import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { DatePipe } from '@angular/common';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { StockMenuService } from '../stock-menu/stock-menu.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  ingredients?: Ingredient[];
  listeVide= false;
  next!: string;
  previous!: string;
  transactionsUrl = "http://localhost:8000/ingredients/";
  message?:string;
  faCoffee = faCoffee;
  cout!: number;
  limit!: number;
  nbrPage!: number;
  isLoading = false;

  constructor(private servise: IngredientService,private notifyService : NotificationService,public datepipe: DatePipe , public api:StockMenuService) { }

  ngOnInit(): void {
    this.retrieveIngredients(this.transactionsUrl);
   /*  this.fetchNext();
    this.fetchPrevious(); */
     this.refreshList();
     this.api.active = 1;
  }

  public greater_than(a: any,b: any) : boolean{
    return parseFloat(a)  >= parseFloat(b);
  }


  /* retrieveIngredients(): void {
    this.servise.getAll()
      .subscribe(
        data => {
          if (data.length == 0) {
            this.listeVide=false;
            this.message="<figure class='text-center'> <blockquote class='blockquote'><p>Le stock est vide</p></blockquote><figcaption class='blockquote-footer'>Cette ici qu'on doit voire <cite title='Source Title'>Les listes de toute les ingredients</cite></figcaption></figure>";
            this.message = document.getElementById('someText')!.innerHTML = this.message;

            //document.getElementById('someText').innerHTML = this.message; class="lead"
          }else{
            this.ingredients = data;
            this.listeVide=true;
          }
          console.log(data);
        },
        error => {
          console.log(error);
        });
  } */

  refreshList(): void {
   /*  this.retrieveIngredients(); */
    this.retrieveIngredients(this.transactionsUrl);
  }



  retrieveIngredients(url: string): void {
    const timeout = setTimeout(() => {
      this.isLoading = true;
    }, 1000);
    this.servise.getliste(url)
      .subscribe(
        data => {

          if (data.length == 0) {
            this.listeVide=false;
            this.message="<figure class='text-center'> <blockquote class='blockquote'><p>Le stock est vide</p></blockquote><figcaption class='blockquote-footer'>Cette ici qu'on doit voire <cite title='Source Title'>Les listes de toute les ingredients</cite></figcaption></figure>";
            this.message = document.getElementById('someText')!.innerHTML = this.message;
          }else{

            this.listeVide=true;
            this.ingredients = data.results;
            this.isLoading = false;
            clearTimeout(timeout);
            this.cout = data.count;
              this.limit = 8;
              this.nbrPage = this.cout / this.limit;
              if (this.nbrPage<1) {
                this.nbrPage = 1;
              }
                this.next = data.next;
                this.previous = data.previous;
          }
            console.log(data);
        },
        error => {
          console.log(error);
        });
     }

  /*   refreshPage(): void {
      this.retrieveCategories(this.transactionsUrl);
     /*  this.fetchNext();
      this.fetchPrevious();
    } */

    fetchNext() {
     /*  this.refreshList(); */
      this.retrieveIngredients(this.next);
    }

    fetchPrevious() {
     /*  this.refreshList(); */
      this.retrieveIngredients(this.previous);
    }


 /*  showToasterSuccess(){
      this.notifyService.showSuccess("Data shown successfully !!", "tutsmake.com")
  }

  showToasterError(){
      this.notifyService.showError("Something is wrong", "tutsmake.com")
  }

  showToasterInfo(){
      this.notifyService.showInfo("This is info", "tutsmake.com")
  }

  showToasterWarning(){
      this.notifyService.showWarning("This is warning", "tutsmake.com")
  } */
}
