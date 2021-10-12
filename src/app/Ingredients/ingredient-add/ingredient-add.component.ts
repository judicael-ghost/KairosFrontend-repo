import { Component, OnInit } from '@angular/core';

import { IngredientService } from 'src/app/services/ingredient.service';
import { Categorie } from 'src/app/modele/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { Unite } from 'src/app/modele/unite.model';
import { UniteService } from 'src/app/services/unite.service';
import { Lieu } from 'src/app/modele/lieu.model';
import { LieuService } from 'src/app/services/lieu.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { StockMenuService } from '../stock-menu/stock-menu.service';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.css']
})
export class IngredientAddComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  categories?: Categorie[];
  unites?: Unite[];
  lieux?: Lieu[];
  oke?: number;
  ingredients?: Ingredient[];
  submitted = false;

    nom_ingredient!: string;
    categorie!: string;
    unite!: string;
    quantite_stock!: string;
    achat_lieu!: string;
    image!: File;

    categorieCrud: Categorie = {
      nom_categorie: ''
    };


  uniteCrud: Unite = {
    nom_unite: '',
    symbol: ''
  };


  lieuCrud: Lieu = {
    nom_lieu: ''
  };

  closeResult = '';

  constructor( private modalService: NgbModal,public api:StockMenuService,private router: Router,private notifyService : NotificationService,private service: IngredientService,private categorieservice: CategorieService,private uniteservice: UniteService, private lieuservice: LieuService) { }

  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveUnites();
    this.retrieveLieux();
    this.categorie= '';
    this.unite= '';
    this.achat_lieu= '';
    this.api.active = 1;
    this.fileInfos = this.service.getFiles();
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
  saveCategorie(): void {
    const data = {
      nom_categorie: this.categorieCrud.nom_categorie
    };
    this.categorieservice.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", this.categorieCrud.nom_categorie);
          this.retrieveCategories();
          this.categorieCrud = {
            nom_categorie: ''
          }
        },
        error => {
          console.log(error);
        });
  }


  saveUnite(): void {
    const data = {
      nom_unite: this.uniteCrud.nom_unite,
      symbol: this.uniteCrud.symbol
    };

    this.uniteservice.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", this.uniteCrud.nom_unite)
          this.retrieveUnites();
          this.uniteCrud = {
            nom_unite: '',
            symbol: ''
          }
        },
        error => {
          console.log(error);
        });
  }


  saveLieu(): void {
    const data = {
      nom_lieu: this.lieuCrud.nom_lieu,
    };

    this.lieuservice.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", this.lieuCrud.nom_lieu)
          this.retrieveLieux();
          this.lieuCrud = {
            nom_lieu: ''
          };

        },
        error => {
          console.log(error);
        });
  }

  retrieveCategories(): void {
    this.categorieservice.getAll()
      .subscribe(
        data => {
          this.categories = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveUnites(): void {
    this.uniteservice.getAll()
      .subscribe(
        data => {
          this.unites = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveLieux(): void {
    this.lieuservice.getAll()
      .subscribe(
        data => {
          this.lieux = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  onIngredient(event: any): void {
    this.nom_ingredient = event.target.value;
  }
  onCategorie(event: any): void {
    this.categorie = event.target.value;
  }
  onUnite(event: any): void {
    this.unite = event.target.value;
  }
  onQuantite(event: any): void {
    this.quantite_stock = event.target.value;
  }
  onLieu(event: any): void {
    this.achat_lieu = event.target.value;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  retrieveIngredients(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.ingredients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);;


      if (file) {

        this.currentFile = file;
        const formData: FormData = new FormData();
        formData.append('nom_ingredient', this.nom_ingredient);
        formData.append('categorie', this.categorie);
        formData.append('unite', this.unite);
        formData.append('quantite_stock', this.quantite_stock);
        formData.append('achat_lieu', this.achat_lieu);
        formData.append('image',  this.currentFile,this.currentFile.name);


        this.service.upload(formData).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
                if(this.progress == 100){
                    setTimeout(()=>{
                      if (!this.message) {
                      this.notifyService.showSuccess("L'ingredient est enregistrer!", "Notification")
                      }
                      this.retrieveIngredients();
                      this.router.navigate(['/ingredients/'])/* .then(()=>{(window.location.reload)} );*/
                    },4000);
                }

            }
            if(event instanceof HttpResponse) {
              this.message = event.body.message;
              if (this.message) {
                setTimeout(()=>{
                  this.notifyService.showWarning(this.message, "Notification")
                },2000);
              }else{
                this.message = event.body.message;
              }
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

}
