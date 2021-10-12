import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { Marcher } from 'src/app/modele/marcher.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MarcherService } from 'src/app/services/marcher.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StockMenuService } from '../stock-menu/stock-menu.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-marcher-list',
  templateUrl: './marcher-list.component.html',
  styleUrls: ['./marcher-list.component.css']
})
export class MarcherListComponent implements OnInit {

  @ViewChild('htmlData') htmlData=ElementRef;

  marchers?: Marcher[];
  //ingredients?: Ingredient[];
  message: any;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  searchResult: boolean = true;

  filter : FormControl;
  constructor(private servise: MarcherService,private serviseIngred: IngredientService , public api:StockMenuService) {
    this.nbItem = 5;
  }

  ngOnInit(): void {
    this.retrieveMarchers();
    //this.retrieveIngredients();
    this.api.active = 6;
  }

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
    this.message= DATA;

    html2canvas(this.message).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('angular-demo.pdf');
    });
  }

  retrieveMarchers(): void {
    this.servise.getAll()
      .subscribe(
        data => {
          this.marchers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // retrieveIngredients(): void {
  //   this.serviseIngred.getAll()
  //     .subscribe(
  //       data => {
  //         this.ingredients = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  refreshList(): void {
    this.retrieveMarchers();
  }




}
