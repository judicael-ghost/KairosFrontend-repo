import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {panier} from '../data';
import { ClientService } from '../client/client.service';
import { MessagingService } from '../service/messaging.service';
import Commande from 'src/app/modele/commande.model';
import { map } from 'rxjs/operators';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})
export class TableComponent implements OnInit {
  today: any;
  todayFace : number = Date.now();
  heure : any;
  table = [{id : 0,nom : 'test'}];
  totalAddition : any;
  totalJour : any;
  client :any[] = [];
  show = true;
  fermer :any[] = [];
  title = 'push-notification';
  message;
  commande? : Commande[];

  nbCommande = 0;

  currentCommande?: Commande;
  currentIndex = -1;
  password = '';
  user = {  first_name : '' ,
            last_name : '' ,
            profile : {
              image : ''
            }
          }
  url = 'http://localhost:8000'

  constructor(private apiLog:LoginService ,private messagingService: MessagingService ,private api: TableService,private modalService: NgbModal , private apiCli: ClientService) {
    this.getTable();
    this.horloge();
    this.today = new Date().toLocaleDateString();
    this.recetteJour();
    this.getUser();
  }


  getUser(){
    this.apiLog.getUtilisateur().subscribe(
      data=> {
        this.user = data;
      },
      error=>{
        console.log(error)
      }
    )
  }
  refreshList(): void {
    this.currentCommande = undefined;
    this.currentIndex = -1;
    this.retrieveCommande();
  }

  retrieveCommande(): void {
    this.api.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.commande = data;
      this.nbCommande = data.length;
    });
  }

  setActiveTutorial(com: Commande, index: number): void {
    this.currentCommande = com;
    this.currentIndex = index;
  }



horloge= () => {
  var t = new Date().toLocaleTimeString()
  this.heure = t;
  setTimeout(this.horloge, 1000);
}

  getTable = () => {
    this.totalAddition = {};
    this.api.getAllTable().subscribe(
      data => {
        this.table = data;
        console.log(this.table);
        data.forEach(element => {
          this.totalAddition[element.id] = 0;
        });
        var i;
        for(i = 0; i < this.table.length ; i++){
          this.total(this.table[i].id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  total(idTable : any) : void{
    this.totalAddition[idTable] = 0;
    var i;
      for(i = 0; i < panier[idTable].length ; i++){
        this.totalAddition[idTable] = this.totalAddition[idTable] + panier[idTable][i].net;
      }
      console.log("Addition : "+this.totalAddition[idTable])
  }

  recetteJour = () => {
    this.api.totalCommande(this.today).subscribe(
      data => {
        this.totalJour = 0;
        var i;
        for(i = 0 ; i < data.length ; i++){
          this.totalJour = this.totalJour + parseInt(data[i].net);
        }
        console.log('total' + data.net)
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

}
