import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertInput() :any{

    return Swal.fire({
                title : 'Entrer le montant du billet',
                input : 'text',
                inputAttributes : {
                  autocapitalize : 'off'
                },
                showConfirmButton : true,
                showCancelButton : true,
                confirmButtonText : 'Ok',
                cancelButtonText : 'Annuler',
                showLoaderOnConfirm : true,
            })
  }

  alertQuestion(text):any{

    return Swal.fire({
                icon : 'question',
                title : 'Confirmation',
                html : 'Voulez-vous vraiment '+text,
                showConfirmButton : true,
                showCancelButton : true,
                confirmButtonText : 'Ok',
                cancelButtonText : 'Annuler',
                showLoaderOnConfirm : true,
            })
  }

  alertErreur(text):any{

    return Swal.fire({
                icon : 'error',
                title : 'Erreur',
                html : text,
                confirmButtonText : 'Ok',
            })
  }

}
