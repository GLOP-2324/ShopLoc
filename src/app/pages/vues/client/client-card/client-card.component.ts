import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../shared/model/Account";
import {ClientCardService} from "../../../../shared/service/clientCardService";
import {ToastrService} from "ngx-toastr";
import {clientCard} from "../../../../shared/model/clientCard";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {
  cardInformation: clientCard | undefined;
  montantCredit:any;
  route: string;
  protected readonly localStorage = localStorage;
  public firstname="";
  public lastname="";
  titreForm = 'Ajout d\'un montant';
  form: FormGroup;
  constructor(private router: Router,private clientCardService:ClientCardService,private toastService:ToastrService) {
    this.getClientCardInfo();
    this.route = this.router.url;
    this.form = new FormGroup({
      montant: new FormControl('', [Validators.required, Validators.min(1)])
    });
    // @ts-ignore
    this.firstname=this.localStorage.getItem("firstname");
    // @ts-ignore
    this.lastname=this.localStorage.getItem("lastname");
  }
  recharger(){
    // @ts-ignore
    this.clientCardService.creditCard(this.localStorage.getItem("email"),this.montantCredit).subscribe((response: any)  => {
      console.log('Success:', response);
      this.toastService.success("Le montant a été ajouté");
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.setAttribute('aria-modal', 'false');
        modalElement.setAttribute('style', 'display: none');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        window.location.reload();

    }
      this.form.reset();
    }, (error: any) => {
      console.error('Error creating product:', error);
      this.form.reset();
    });

  }
  onSubmit() {
    const formData = this.form.value;
      this.montantCredit=formData.montant
      // @ts-ignore

  }
  getClientCardInfo(){
    // @ts-ignore
    this.clientCardService.getFidelityCardMontant(this.localStorage.getItem("email")).subscribe((response:any)=>{
      this.cardInformation=response;
      console.log(this.cardInformation,'hereeeeeeeeee')
    })
  }
}

