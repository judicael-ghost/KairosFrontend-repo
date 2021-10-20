import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit , PipeTransform } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ProduitService } from './produit.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  providers: [DecimalPipe]
})



export class ProduitComponent implements OnInit {
  closeResult = '';
  produit : ProduitFace[] = [{id : 1 ,nom : 'test' , categorie : {nomCate : 'test'} , prix : '100'}];
  categorieList = [{nom : 'test'}];
  produitClicked :any;
  categorieClicked :any;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  nbProduit = 0;
  nbCategorie = 0;
  nom : string;
  categorie : string;
  prix : string;
  cover : File;
  imgPath = "http://localhost:4200/assets/img/misao.jpg";
  baseurl = 'http://127.0.0.1:8000'
  baseUrl = "http://localhost:8000/"
  searchResult: boolean = true;

  produit$ : Observable<ProduitFace[]>;
  filter : FormControl;
  tableau:any[] = [];
  max = 0;
  min = 0;
  nameMax;
  nameMin;

  constructor(private api:ProduitService , private http: HttpClient , private modalService: NgbModal, private toastr: ToastrService , private pipe: DecimalPipe) {
    	this.getProduit();
      this.getCategorie();
      this.filter = new FormControl('');
      this.nbItem = 5;
      this.produitClicked = { id : '' , nom : "" , categorie : {nomCate : ""} , prix : "" , etat : ""};
      this.categorieClicked = { id : '' , nom : "" , etat : ""};
      this.allCommande();
  }

  allCommande(){
    this.api.getAllCommande().subscribe(
        data => {
          for(var i =0 ; i < data.length ; i++){
            var item = {
              "name" : data[i].categorie+" "+data[i].nom,
              "value" : data[i].quantite
            }
            var index : any = this.tableau.findIndex((e) => {
              return e.name == item.name;
            });

            if(index > -1 ){
              this.tableau[index].value = this.tableau[index].value*1 + item.value*1;
            }else{
              this.tableau.push(item);
            }

          }
            console.log('tableau : ',this.tableau)
            this.myArrayMax(this.tableau);
      }
    )

  }
  myArrayMax(arr) {
    arr.sort(function(a, b){return a.value - b.value});
    this.max = arr[arr.length - 1].value;
    this.nameMax = arr[arr.length - 1].name;
    this.min = arr[0].value;
    this.nameMin = arr[0].name;
  }

  search(text: string, pipe: PipeTransform): ProduitFace[] {
    return this.produit.filter(country => {
      const term = text.toLowerCase();
      return country.categorie.nomCate.toLowerCase().includes(term)
          || country.nom.toLowerCase().includes(term)
          || pipe.transform(country.prix).includes(term)
    });
  }

onImageChanged(event : any){
  this.cover = event.target.files[0];
  console.log(this.cover)
}

onNomChanged(event : any){
  this.nom = event.target.value;
}

changePage(event : any){
  this.page = event.target.value;
}

onCategorieChanged(event : any){
  this.categorie = event.target.value;
  console.log(this.categorie)
}

onPrixChanged(event : any){
  this.prix = event.target.value;
}
onAnnuler(){
  this.categorieClicked = { id : '' , nom : "" , etat : ""};
}

onAnnulerProduit(){
  this.produitClicked = { id : '' , nom : "" , categorie : "" , prix : "" , etat : ""};
}

ajoutProduit = () => {
    const body = new FormData();
    body.append('nom' , this.nom);
    body.append('categorie',this.categorie);
    body.append('prix',this.prix);
    body.append('cover',this.cover,this.cover.name);

    this.http.post(this.baseurl+ '/ajoutproduits/' , body).subscribe(
      data => {this.getProduit();},
      error => {console.log(error);}
    );
}

updateProduit = () => {
  const body = new FormData();
  body.append('nom' , this.produitClicked.nom);
  body.append('categorie',this.produitClicked.categorie.nomCate);
  body.append('prix',this.produitClicked.prix);
  body.append('cover',this.cover,this.cover.name);

  console.log(body , 'Donnees')

  this.http.put(this.baseurl+ '/produits/'+this.produitClicked.id+'/' , body).subscribe(
    data => {this.getProduit();},
    error => {console.log(error);}
  );
}

onSave(){
if(this.produitClicked.etat == "modif"){
  this.updateProduit();
    this.toastr.success("Produit modifier avec succès");
    this.onAnnulerProduit();
  }else{
    this.ajoutProduit();
    this.toastr.success("Nouvelle produit enregistrer avec succès");
    this.onAnnulerProduit();
  }

}

getProduit = () => {
  this.api.getProduit().subscribe(
    data => {
      this.produit = data;
      console.log(this.produit)
      this.nbProduit = data.length;
      this.produit$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, this.pipe)),
      );
      this.produit$.subscribe(
        data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
      )
    },
    error => {
      console.log(error);
    }
  );
}

test() {

}

getCategorie = () => {
  this.api.getCategorie().subscribe(
    data => {
      this.categorieList = data;
      this.nbCategorie = data.length;
    },
    error => {
      console.log(error);
    }
  );
}

ajoutCategorie = () => {
  this.api.ajoutCategorie(this.categorieClicked).subscribe(
    data => {
      this.getCategorie()
    },
    error => {
      console.log(error);
    }
  );
}

updateCategorie = () => {
  this.api.updateCategorie(this.categorieClicked).subscribe(
    data => {
      this.getCategorie()
    },
    error => {
      console.log(error);
    }
  );
}

deleteCategorie = (id:any) => {
  this.api.deleteCategorie(id).subscribe(
    data => {
      this.getCategorie();
      this.toastr.info("Categorie supprimé avec succé");
    },
    error => {
      console.log(error);
    }
  );
}

onClickedCategorie = (id:any) => {
  this.api.getOneCategorie(id).subscribe(
    data => {
      this.categorieClicked = data;
      this.categorieClicked.etat = "modif";
      console.log(this.categorieClicked.etat)
    },
    error => {
      console.log(error);
    }
  );
}
onEnregistrer(){
  if(this.categorieClicked.etat == "modif"){
    this.updateCategorie();
    this.toastr.success("Catégorie modifier avec succès");
    this.onAnnuler();
  }else{
    this.ajoutCategorie();
    this.toastr.success("Nouvelle catégorie enregistrer avec succès");
    this.onAnnuler();
  }
}
onClicked = (id:any) => {
  this.api.getOneProduit(id).subscribe(
    data => {
      this.produitClicked = data;
      this.produitClicked.etat = "modif"
    },
    error => {
      console.log(error);
    }
  );
}

deleteProduit = (id:any) => {
  this.api.deleteProduit(id).subscribe(
    data => {
      this.getProduit();
      this.toastr.info("Suppression reussi");

    },
    error => {
      console.log(error);
    }
  );
}

deleteProduitCate = (cate:any , id:any) => {
  this.api.deleteProduitCate(cate).subscribe(
    data => {
      this.getProduit();
      this.api.deleteCategorie(id).subscribe(
        data => {
          this.getCategorie();
          this.toastr.info("Categorie supprimé avec succé");
        },
        error => {
          console.log(error);
        }
      );
    },
    error => {
      console.log(error);
    }
  );
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
}

}

interface ProduitFace {
  id: number;
  nom: string;
  categorie : {nomCate : string};
  prix: string;
}

