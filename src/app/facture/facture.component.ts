import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommandeService } from '../commande/commande.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers: [ DecimalPipe]
})
export class FactureComponent implements OnInit {

  factureList: factureFace[] = [{id : 1 , dateFacture : 'test' , heureFatcure : 'test' , total : 0 , billet : 0 , rendu : 0}];
  factureCommande : any;

  totalLength : any;
  page : number = 1;
  nbItem : any;
  searchResult: boolean = true;
  filter : FormControl;

  facture$ : Observable<factureFace[]>;

  constructor(private api : CommandeService , private pipe: DecimalPipe) {
    this.getFacture();
    this.nbItem = 5;
    this.filter = new FormControl('');

  }

  search(text: string, pipe: PipeTransform): factureFace[] {
    return this.factureList.filter(elem => {
      const term = text.toLowerCase();
      return pipe.transform(elem.id).includes(term)
      || pipe.transform(elem.total).includes(term)
      || pipe.transform(elem.billet).includes(term)
      || pipe.transform(elem.rendu).includes(term)

    });
  }

  getFacture = () => {
    this.factureCommande = {};
    this.api.getFacture().subscribe(
      data => {
      this.factureList = data;
      this.facture$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, this.pipe)),
      );
      this.facture$.subscribe(
        data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
      )
      this.factureList.forEach(element => {
        this.api.getOneFacture(element.id).subscribe(
          data => {
            this.factureCommande[element.id] = data;
            console.log(this.factureCommande);
          },
          error => {
            console.log(error)
          }
        )
      });
      }
    )
  }

  getCommande(){

  }

  ngOnInit(): void {
  }

}
interface factureFace {
  id:number;
  dateFacture: string;
  heureFatcure: string;
  total: number;
  billet:number;
  rendu:number;
}
