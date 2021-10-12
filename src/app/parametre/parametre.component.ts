import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../table/table.service';
import { ParametreService } from './parametre.service';
import { faGreaterThanEqual } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {

  bonusList : any;
  closeResult = '';
  bonusClicked : any;
  tableClicked : any;
  tableList = [{nom : 'test'}];
  nbProduit = 0;
  faGreaterThanEqual = faGreaterThanEqual;
  nbTable = 0;
  nbRegle = 0;
  nbUser = 0;
  user = {  first_name : '' ,
            last_name : '' ,
            profile : {
              image : ''
            }
          }

  image: File;
  edit = '';
  isProfile = false;

  PROFILE_URL = environment.baseUrl+"utilisateur/profile/"
  utilisateur = [{username: '', first_name: '', last_name: '', email: '', password: '', profile: {id:'', accounts: '', type: '', telephone: '', image: '' }}]
  utilisateurs: any;
  profile: any;


  constructor(private apiLog : LoginService, private api:ParametreService , private apiTab:TableService ,private toastr: ToastrService , private http: HttpClient , private modalService: NgbModal) {
    this.getBonus();
    this.getTable();
    this.getUserConnecter();
    this.bonusClicked = {id : '' , point : '' , min : '' , max : '' , etat : ''}
    this.tableClicked = { id : '' , nom : '' , etat : ''}
    this.utilisateurs =  { username: '', first_name: '', last_name: '', email: '', password: '', profile: { id:'', accounts: '', type: '', telephone: '', image: '' }}
    this.profile = {id:'',accounts: '', type:'', telephone: '', image:''}
   }

   getTable = () => {
    this.apiTab.getAllTable().subscribe(
      data => {
        this.tableList = data;
        this.nbTable = data.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTable = (id:any) => {
    this.apiTab.deleteTable(id).subscribe(
      data => {
        this.getTable();
        this.toastr.info("Table supprimé avec succé");
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickedTable= (id:any) => {
    this.apiTab.getOneTable(id).subscribe(
      data => {
        this.tableClicked = data;
        this.tableClicked.etat = "modif";
        console.log(this.tableClicked.etat)
      },
      error => {
        console.log(error);
      }
    );
  }
  onAnnulerTable(){
    this.tableClicked = { id : '' , nom : '' , etat : ''}
  }

  ajoutTable = () => {
    this.apiTab.ajoutTable(this.tableClicked).subscribe(
      data => {
        this.getTable()
        this.toastr.success("Nouvelle table enregistrer avec succès");
      },
      error => {
        console.log(error);
      }
    );
  }

  updateTable = () => {
    this.apiTab.updateTable(this.tableClicked).subscribe(
      data => {
        this.getTable()
        this.toastr.success("Table modifier avec succès");
      },
      error => {
        console.log(error);
      }
    );
  }

  onEnregistrerTable(){
    if(this.tableClicked.etat == "modif"){
      this.updateTable();
      this.onAnnulerTable();
    }else{
      this.ajoutTable();
      this.onAnnulerTable();
    }
  }

  onClickedBonus= (id:any) => {
    this.api.getOneBonus(id).subscribe(
      data => {
        this.bonusClicked = data;
        this.bonusClicked.etat = "modif";
        console.log(this.bonusClicked.etat)
      },
      error => {
        console.log(error);
      }
    );
  }


  getBonus = () => {
    this.api.getBonus().subscribe(
      data => {
        this.bonusList = data;
        this.nbRegle = data.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteBonus = (id:any) => {
    this.api.deleteBonus(id).subscribe(
      data => {
        this.getBonus();
        this.toastr.info("Bonus supprimé avec succé");
      },
      error => {
        console.log(error);
      }
    );
  }

  ajoutBonus = () => {
    this.api.ajoutBonus(this.bonusClicked).subscribe(
      data => {
        this.getBonus()
        this.toastr.success("Nouvelle condition enregistrer avec succès");
      },
      error => {
        console.log(error);
      }
    );
  }

  updateBonus = () => {
    this.api.updateBonus(this.bonusClicked).subscribe(
      data => {
        this.getBonus()
        this.toastr.success("Bonus modifier avec succès");
      },
      error => {
        console.log(error);
      }
    );
  }

  onEnregistrer(){
    if(this.bonusClicked.etat == "modif"){
      this.updateBonus();
      this.onAnnuler();
    }else{
      this.ajoutBonus();
      this.onAnnuler();
    }
  }

  onAnnuler(){
    this.bonusClicked = {id : '' , point : '' , min : '' , max : '' , etat : ''}
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


  onImageChanged(event : any){
    this.image = event.target.files[0];
  }

  videProfile(){
    this.profile =  this.profile = {id:'',accounts: '', type:'', telephone: '', image:''};
  }



  ajoutProfile = () => {

    const body = new FormData();

    body.append('accounts', this.profile.accounts);
    body.append('type', this.profile.type);
    body.append('telephone', this.profile.telephone);
    body.append('image', this.image, this.image.name)

    this.http.post(this.PROFILE_URL,body).subscribe(
      data => {
        this.getUser();
        this.videProfile();
      },
      error =>{
        console.log(error);
      }
    )
  }

  editProfile = (id:any) => {
    this.api.getOneProfile(id).subscribe(
      data => {
        this.profile = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateProfile = (id:any) => {
    const body = new FormData();
    body.append('accounts', this.profile.accounts);
    body.append('type', this.profile.type);
    body.append('telephone', this.profile.telephone);
    body.append('image', this.image)

    this.http.put(this.PROFILE_URL+id+'/',body).subscribe(
      data => {
        this.getUser();
        this.videUser();
      },
      error =>{
        console.log(error)
      }
    )
  }

  getUserConnecter(){
    this.apiLog.getUtilisateur().subscribe(
      data=> {
        this.user = data;
      },
      error=>{
        console.log(error)
      }
    )
  }

  // Nouvelle utilisateur

  getUser = () =>{
    this.api.getUtilisateur().subscribe(
      data =>{

        this.utilisateur = data;
        this.nbUser = data.length;
      },
      error => {
        console.log(error)
      }
    )
  }

  ajoutUtilisateur = () => {
    this.api.ajoutUtilisateur(this.utilisateurs).subscribe(
      data => {
        this.utilisateurs = data;
        this.profile.accounts = this.utilisateurs.id;
        this.ajoutProfile();
        this.videUser();
        this.toastr.success("Utilisateur enregistré avec succès");
      },
      error => {
        console.log(error)
      }
    )
  }

  editUser = (id: any) => {
    this.api.getOnUtilisateur(id).subscribe(
      data => {
        this.utilisateurs = data;
        this.profile.accounts = this.utilisateurs.id
        var id = this.utilisateurs.profile.id
        this.editProfile(id);
      },
      error => {
        console.log(error)
      }
    )
  }

  updateUser() {
    this.api.modiffierUtilisateur(this.utilisateurs).subscribe(
      data => {
        this.utilisateurs = data;
        var id = this.utilisateurs.profile.id
        this.updateProfile(id)
        this.getUser();
        this.videUser();
        this.toastr.success("Utilisateur modifié avec succès");

      },
      error => {
        console.log(error);
      }
    )
  }

  deleteUser(id:any){
    this.api.supprimerUtilisateur(id).subscribe(
      data => {
        this.toastr.info("Utilisateur supprimé avec succèss");
        this.getUser();
      },
      error => {
        console.log(error)
      }
    )
  }


  videUser(){
    this.utilisateurs =  {username: '', first_name: '', last_name: '', email: '', password: '', profile: { type: '', telephone: '', image: '' }}
    this.videProfile();
  }





  ngOnInit(): void {
    this.getUser();
    this.getBonus();
    this.getTable();
  }
}
