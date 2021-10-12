import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Categorie } from 'src/app/modele/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { Unite } from 'src/app/modele/unite.model';
import { UniteService } from 'src/app/services/unite.service';
import { Ingredient } from 'src/app/modele/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Marcher, MarcherCrud } from 'src/app/modele/marcher.model';
import { HistoriqueAchatService } from 'src/app/services/historique-achat.service';
import { Historique } from 'src/app/modele/historique.model';
import { DatePipe } from '@angular/common';
import { Prix } from 'src/app/modele/prix.model';
import { PrixService } from 'src/app/services/prix.service';
import { Lieu } from 'src/app/modele/lieu.model';
import { LieuService } from 'src/app/services/lieu.service';
import { MarcherService } from 'src/app/services/marcher.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockMenuService } from '../stock-menu/stock-menu.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.css']
})
export class IngredientDetailsComponent implements OnInit {

  fileInfos?: Observable<any>;

  categories?: Categorie[];
  unites?: Unite[];
  prix?: Prix[];
  currentIngredient: Ingredient = {
    nom_ingredient: '',
    categorie: '',
    unite: '',
    mode: '',
    achat_lieu:'',
    achat_quantite:'',
    achat_montant:'',
    quantite_stock:'',
    achat_prix_unitaire:'',
    alerte_quantite:'',
    don_quantite:''
  };

  lieux?: Marcher[];
  lieuxmarcher?: Lieu[];
  historyAchat?: Historique[];
  marcher: Marcher = {
    //ingredient: '',
    lieu: '',
    prix: ''
  };
  message= '';
  lieuAjout: any;
  prixAjout: any;

  result: any;
  nomIngredients: any;
  active = 1;
  closeResult = '';

  constructor(private service: IngredientService,private servicemarcher: MarcherService,
    private modalService: NgbModal,
    private route: ActivatedRoute,private history: HistoriqueAchatService,private sweet : AlertService,
    private router: Router,private categorieservice: CategorieService,private lieuservice: LieuService,public api:StockMenuService,
    private uniteservice: UniteService,private notifyService : NotificationService,public datepipe: DatePipe,private prixservice: PrixService) { }

  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveUnites();
    this.getIngredient(this.route.snapshot.params.id);
    this.getHistory(this.route.snapshot.params.id);
    this.getMarcher(this.route.snapshot.params.id);
    this.retrievePrix();
    this.retrieveLieux();
    this.api.active = 1;

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

  viderIngredient(): void {
    var text = 'de vider le stock?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.viderIngre(this.currentIngredient.id,this.currentIngredient).subscribe(
      response => {
        this.notifyService.showSuccess("Le stock a été bien vider !!", this.currentIngredient.nom_ingredient);
        this.getIngredient(this.route.snapshot.params.id);
      },
      error => {
        console.log(error);
        this.notifyService.showError("Something is wrong", "Notification");
      });
    }
  })
  }

  donIngredient(): void {
    const data = {
      "don_quantite": this.currentIngredient.don_quantite,
      "mode": this.currentIngredient.mode
    }
    this.service.don(this.currentIngredient.id, data)
      .subscribe(
        response => {
          //console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", this.currentIngredient.nom_ingredient);
          this.router.navigate(['/ingredients/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
  }


  public greater_thane(a: any) : boolean{
    return parseFloat(a) > 0;
  }
  retrieveCategories(): void {
    this.categorieservice.getAll()
      .subscribe(
        data => {
          this.categories = data;
         // console.log(data);
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
         // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getIngredient(id: string): void {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentIngredient = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getMarcher(id: string): void {
    this.service.marcher(id)
      .subscribe(
        data => {
          this.lieux = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  getHistory(id: string): void {
    //var id = this.currentIngredient.id;
    this.history.get(id)
      .subscribe(
        data => {
          this.historyAchat = data;
         /*  this.nomIngredients = this.result.map((ingred: any) => ingred.nom_ingredient); */
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveLieux(): void {
    this.lieuservice.getAll()
      .subscribe(
        data => {
          this.lieuxmarcher = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePrix(): void {
    this.prixservice.getAll()
      .subscribe(
        data => {
          this.prix = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveMarcher(): void {
    const data = {
      ingredient: this.currentIngredient.id,
      lieu: this.lieuAjout,
      prix: this.prixAjout

    };
    console.log(this.marcher)

    this.servicemarcher.create(data)
      .subscribe(
        response => {
          if(!response.message){
            //console.log(response);
            this.notifyService.showSuccess("Votre donnée est enregitrer!!", "Notification")
            //this.submitted = true;
            this.getMarcher(this.route.snapshot.params.id);
          }/* else{
            this.marcher = {
              //ingredient: '',
              lieu: '',
              prix: ''
            };
          } */

        },
        error => {
          console.log(error);
        });
  }

  deleteIngredient(): void {
    var text = 'Supprimer cet Ingredient?';
    this.sweet.alertQuestion(text)
    .then((result) => {
      if(result.value){
    this.service.delete(this.currentIngredient.id)
      .subscribe(
        response => {
          //console.log(response);
          this.notifyService.showSuccess("Data shown successfully !!", "Notification")
          this.router.navigate(['/ingredients/']);
        },
        error => {
          this.notifyService.showError("Something is wrong", "Notification")
          console.log(error);
        });
    }
  })
  }

  updateIngredient(): void {
    const data = {
      "nom_ingredient": this.currentIngredient.nom_ingredient,
      "categorie": this.currentIngredient.categorie.id,
      "unite": this.currentIngredient.unite.id,
      "mode": this.currentIngredient.mode
    }

    this.service.update(this.currentIngredient.id, data)
      .subscribe(
        response => {
          //console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", this.currentIngredient.nom_ingredient);
          this.router.navigate(['/ingredients/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
  }


  achatIngredient(): void {

    const data = {
      "achat_quantite": this.currentIngredient.achat_quantite,
      "achat_montant": this.currentIngredient.achat_montant,
      "quantite_stock": this.currentIngredient.quantite_stock,
      "achat_lieu": this.currentIngredient.achat_lieu.id,
      "achat_prix_unitaire": this.currentIngredient.achat_prix_unitaire,
      "mode": this.currentIngredient.mode
    }

    this.service.approvisionnement(this.currentIngredient.id, data)
      .subscribe(
        response => {
          //console.log(response);
          //const message = this.currentIngredient.nom_ingredient;
          this.notifyService.showSuccess("Le quantité est à jours !!", this.currentIngredient.nom_ingredient);
          this.router.navigate(['/ingredients/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
  }

  parametreIngredient(): void {
    const data = {
      "alerte_quantite": this.currentIngredient.alerte_quantite,
      "mode": this.currentIngredient.mode
    }
    this.service.alerte(this.currentIngredient.id, data)
      .subscribe(
        response => {
          //console.log(response);
          this.notifyService.showSuccess("Le donnée a bien été modifié !!", this.currentIngredient.nom_ingredient);
          this.router.navigate(['/ingredients/']);
        },
        error => {
          console.log(error);
          this.notifyService.showError("Something is wrong", "Notification");
        });
  }

}
