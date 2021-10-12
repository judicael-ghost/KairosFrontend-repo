import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProduitDetailService } from 'src/app/produit-detail/produit-detail.service';
import { ProduitService } from 'src/app/produit/produit.service';
import { AlertService } from 'src/app/service/alert.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SharedService } from 'src/app/services/shared.service';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-liste-fichetech',
  templateUrl: './liste-fichetech.component.html',
  styleUrls: ['./liste-fichetech.component.css'],
  providers: [DecimalPipe]
})
export class ListeFichetechComponent implements OnInit {
  message= '';
  submit= false;
  quantite_ingredient?:any[];
  ModalTitle!:string;
  activateAddEditEditRecComp:boolean=false;
  rec:any;
  listIngred?: any=[];
  produitexact?: any = {categorie : {nomCate : ''} , nom : ''};
  ingredient?:string;
  produit?:string;
  ProduitRecette?:recetteFace[] = [{id : 1 , quantite_ingredient : 1 , produit : { nom : ''} , ingredient : {nom_ingredient : ''} , unite : {symbol : ''}}];
  filter : FormControl;
  searchResult: boolean = true;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  closeResult = '';
  recette$ : Observable<recetteFace[]>;
  listUnite : any;
  unite : string;

  constructor(private apiUni : UniteService,private sweet:AlertService, private modalService: NgbModal , private pipe: DecimalPipe,private service:SharedService,  private route: ActivatedRoute, private router: Router , private apiIngre:IngredientService , private apiProd:ProduitService) {
    this.filter = new FormControl('');
    this.nbItem = 5;
   }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.get(this.route.snapshot.params.id);
    this.ingredient='';
    this.getProduit(this.route.snapshot.params.id);
    this.selecteIngredient()
    this.getUnite();

  }

  editClick(item:any){
  this.rec =item;
  this.ModalTitle="Edit Rec";
  this.activateAddEditEditRecComp=true;
    }

deleteClick(item:any){
  var text = 'Supprimer cet ingredient?';
      this.sweet.alertQuestion(text)
      .then((result) => {
        if(result.value){
        this.service.deleteRec(item.id).subscribe(data=>{
          console.log(data)
          this.getProduit(this.route.snapshot.params.id);
        })
      }
      }
      )

   }

  closeClick(){
  this.activateAddEditEditRecComp=false;
  //this.activateAddEditRecComp=false;
}

addFich(){
  const data = {
    "ingredient":this.ingredient,
    "quantite_ingredient":this.quantite_ingredient,
    "produit":this.route.snapshot.params.id,
    "unite":this.unite

  }
  this.service.addRec(data).subscribe(res=>{
    console.log(res);
    if(res.message){
      this.message = res.message
      this.submit=true;
    }else{
      this.submit= true;
      this.message= 'Enregistrer avec succés!!!';
      this.getProduit(this.route.snapshot.params.id);
    }
  });
}

RefreshRecList(){
  this.get(this.route.snapshot.params.id);
  this.getProduit(this.route.snapshot.params.id);
  }

selecteIngredient(): void{
  this.apiIngre.getAll().subscribe(data =>{
    this.listIngred = data;
  },error =>{
    console.log(error);
  } );
}

get(id: any): void {
  this.apiProd.getOneProduit(id)
    .subscribe(
      data => {
        this.produitexact = data;
        console.log("produit",data);
      },
      error => {
        console.log(error);
      });
}

getUnite(){
  this.apiUni.getAll().subscribe(
    data => {
      this.listUnite = data;
    },
    error => {
      console.error(error);
    }
  )
}

getProduit(id: any): void {
  this.service.getProduitRe(id)
    .subscribe(
      data => {
        this.ProduitRecette = data;
        console.log(data , 'ProduitRecette');
        this.recette$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe)),
        );
        this.recette$.subscribe(
          data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
        )
      },
      error => {
        console.log(error);
      });
}
search(text: string, pipe: PipeTransform): recetteFace[] {
  return this.ProduitRecette.filter(country => {
    const term = text.toLowerCase();
    return pipe.transform(country.quantite_ingredient).includes(term)
        || country.produit.nom.toLowerCase().includes(term)
        || country.ingredient.nom_ingredient.toLowerCase().includes(term)
        || country.unite.symbol.toLowerCase().includes(term)
  });
}
}
interface recetteFace {
  id:number;
  quantite_ingredient: number;
  produit:  {nom : string};
  ingredient: {nom_ingredient : string};
  unite:  {symbol : string};
}
