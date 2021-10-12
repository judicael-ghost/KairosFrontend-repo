import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-afftec',
  templateUrl: './list-afftec.component.html',
  styleUrls: ['./list-afftec.component.css']
})
export class ListAfftecComponent implements OnInit {

  constructor(private service:SharedService,  private route: ActivatedRoute, private router: Router) { }
  message= '';
  submit= false;
  quantite_ingredient?:any[];
  ModalTitle!:string;
  activateAddEditEditRecComp:boolean=false;
  rec:any;
  listIngred?: any=[];
  produitexact?: any;
  ingredient?:string;
  produit?:string;
  ProduitRecette?:any=[];

  ngOnInit(): void {
    this.RefreshRecList();
    this.get(this.route.snapshot.params.id);
    this.ingredient='';
    this.getProduit(this.route.snapshot.params.id);


  }


  closeClick(){
  this.activateAddEditEditRecComp=false;
  this.RefreshRecList();
}

RefreshRecList(){
  this.get(this.route.snapshot.params.id);
  this.getProduit(this.route.snapshot.params.id);
  }


get(id: any): void {
  this.service.get(id)
    .subscribe(
      data => {
        this.produitexact = data;
        console.log("produit",data);
      },
      error => {
        console.log(error);
      });
}

getProduit(id: any): void {
  this.service.getProduitRe(id)
    .subscribe(
      data => {
        this.ProduitRecette = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

  }
