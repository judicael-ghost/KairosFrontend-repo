import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { ClientService } from '../client/client.service';
import {datatest} from '../data';
import Commande from '../modele/commande.model';
import { HeaderService } from './header.service';
import { map } from 'rxjs/operators';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  client : any[] = [];
  show = true;
  displayLigne = false;
  nbNotif = 0;
  nbEnligne = 0;
  nbCommande = 0;
  commande? : Commande[];

  currentCommande?: Commande;
  currentIndex = -1;
  password = '';

  faSignOutAlt = faSignOutAlt;

  user = {  first_name : '' ,
  last_name : '' ,
  profile : {
    type: '',
    image : ''
  }
}

  constructor(public apiCli: ClientService , public api:HeaderService , private apiLogin:LoginService , private route : Router) {
    this.getCliente();
    this.getUser();
    // this.retrieveCommande();
  }
  logout(){
    this.apiLogin.logout().subscribe(
      data =>{
        this.route.navigate(['']).then(()=> {
          window.location.reload()
        });
        document.cookie = 'csrftoken=;expires=Thu,01 Jan 1970 00:00 UTC; path=/;'
      },
      error=>{
        console.log(error)
      }
    )
  }

  getUser(){
    this.apiLogin.getUtilisateur().subscribe(
      data =>{
        this.user = data;
        if(this.user.profile.type == 'caissier'){
          this.api.userType = false;
        } else {
          this.api.userType = true;
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  validerBonus(client){
    this.apiCli.updateClientBonus(client , 0).subscribe(
      data => {
        this.close(client.id);
      },
      error => {
        console.log(error);
      }
    );
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
      if(this.nbCommande == 0 || this.nbCommande == null){
        this.displayLigne = true;
      }
    });
  }

  setActiveCommande(com: Commande, index: number): void {
    this.currentCommande = com;
    this.currentIndex = index;
  }

  getCliente = () => {
    this.apiCli.getAllClient().subscribe(
      data => {
        for(var i = 0 ; i < data.length ; i++){
          if(data[i].point >= 10){
            this.api.nbTest.push(data[i]);
            this.api.display = true;
            this.nbNotif = this.client.length;
            console.log('notif : '+this.nbNotif)
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  close(id) {
    var index = this.api.nbTest.findIndex((e) => {
      return e.id == id;
    });
    if(index > -1 ){
      this.api.nbTest = [...this.api.nbTest.slice(0, index), ...this.api.nbTest.slice(index + 1)];
      this.nbNotif = this.api.nbTest.length;
    }
    if(this.api.nbTest.length < 1){
      this.api.display = false;
    }

  }

  ngOnInit(): void {
  }

}
