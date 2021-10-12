import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/service/login-guard.service';
import { HeaderService } from '../header/header.service';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  wrongCredentials: boolean = false;

  type: boolean = false;
  constructor(private loginService: LoginService, private router: Router, private loginGuard: LoginGuard ,public apiHead: HeaderService) {
  }

  ngOnInit(): void { }

  onSubmit(form: NgModel){

    this.wrongCredentials = false;

    const username = form.value['username'];
    const password = form.value['password'];

    this.loginService.login(username, password).subscribe( result => {
        this.loginService.getUtilisateur().subscribe(
          result => {
            console.log(result)
            if(result.profile.type === 'Caissier'){
                this.router.navigate(['table']);
                this.apiHead.userType = false;
                console.log(result)
            }
            else{
                this.router.navigate(['accueil']);
                this.apiHead.userType = true;
            }
          },
          error => {
            console.log(error);
          });
    }, error => {
      this.wrongCredentials = true;
      console.log(error);
    })
  }

}

