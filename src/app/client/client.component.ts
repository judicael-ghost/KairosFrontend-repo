import { Component, OnInit, PipeTransform } from '@angular/core';
import { ClientService } from './client.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {datatest} from '../data';
import { DetailService } from '../detail/detail.service';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from '../commande/commande.service';
import { FilterPipe } from '../pipe/filter.pipe';
import { LimitToPipe } from '../pipe/limit-to.pipe';

import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
    providers: [ClientService , DecimalPipe]
})
export class ClientComponent implements OnInit {
  client : ClientFace[] = [{id : 1 , nom : 'test' , prenom : 'test' , adresse : 'test' , tel : 0}];
  listClient =[];
  pagination = {
    searchItem: '',
    page: 1,
    pageSize: 2,
    collectionSize: 0,
    totalItem: 0
  }
  pie = [1000,1000,1000,1000,1000]
  closeResult = '';
  selectedClient : any;
  nbClient = 0;
  totalLength : any;
  page : number = 1;
  nbItem : any;
  datatest:any[];
  lang:String = "french";
  commande : any;
  commandeClient : any;
  bounce = 0;
  currentRate;

  searchResult: boolean = true;

  client$ : Observable<ClientFace[]>;
  filter : FormControl;

  constructor(private pipe: DecimalPipe , private api: ClientService , private apiCom:CommandeService , private modalService: NgbModal,private detail: DetailService,private toastr: ToastrService, private limitTo: LimitToPipe) {
    Object.assign(this, {datatest});
    this.getClient();
    this.selectedClient = {id : -1 , nom : '', prenom : '', adresse : '', tel : ''};
    this.countClient();
    this.filter = new FormControl('');
    this.nbItem = 5;
    this.getCommande();
    this.getCommandeClient();
  }
  search(text: string, pipe: PipeTransform): ClientFace[] {
    return this.client.filter(country => {
      const term = text.toLowerCase();
      return country.nom.toLowerCase().includes(term)
          || country.prenom.toLowerCase().includes(term)
          || country.adresse.toLowerCase().includes(term)
          || pipe.transform(country.tel).includes(term)
    });
  }

  clientClicked = (clients:any) => {
    this.api.getOneClient(clients.id).subscribe(
      data => {
        this.selectedClient = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCommande = () => {
    this.apiCom.geCommande().subscribe(
      data => {
        this.commande = data.length;
        this.bounce = (this.commandeClient / this.commande) * 100
      },
      error => {
        console.log(error);
      }
    );
  }

  getCommandeClient = () => {
    this.apiCom.geCommandeClient().subscribe(
      data => {
        this.commandeClient = data.length;
        this.bounce = (this.commandeClient / this.commande) * 100
      },
      error => {
        console.log(error);
      }
    );
  }


  countClient = () => {
    this.api.countClient().subscribe(
      data => {
        this.nbClient = data.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  getClient = () => {
    this.api.getAllClient().subscribe(
      data => {
        this.client = data;
        this.client$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe)),
        );
        this.client$.subscribe(
          data => {data.length == 0 ? this.searchResult = false : this.searchResult = true}
        )
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteClient = (clients:any) => {
    this.api.deleteClient(clients.id).subscribe(
      data => {
        this.getClient();
        this.toastr.info("Suppression reussi");
      },
      error => {
        console.log(error);
      }
    );

  }
  updateClient = () => {
    this.api.updateClient(this.selectedClient).subscribe(
      data => {
        this.getClient();
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
interface ClientFace {
  id:number;
  nom: string;
  prenom: string;
  adresse: string;
  tel:number;
}


