import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../shared/model/Account";
import {ClientCardService} from "../../../../shared/service/clientCardService";
import {ToastrService} from "ngx-toastr";
import {clientCard} from "../../../../shared/model/clientCard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {
  fidelityPoints: any ;
  cardNumber: string = "1234567890"
  cardInformation: clientCard | undefined;
  montantCredit:any;
  route: string;
  protected readonly localStorage = localStorage;
  public firstname="";
  public lastname="";
  titreForm = 'Recharger la carte';
  form: FormGroup;
  constructor(private router: Router,private clientCardService:ClientCardService,private toastService:ToastrService) {
    // @ts-ignore
    clientCardService.getFidelityPoints(localStorage.getItem("email")).subscribe((points)=>{
      this.fidelityPoints=points;
    console.log(points)
    });
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
  }
  getClientCardInfo(){
    // @ts-ignore
    this.clientCardService.getFidelityCardMontant(this.localStorage.getItem("email")).subscribe((response:any)=>{
      this.cardInformation=response;
    })
  }
  generateBarcode(cardNumber: string): void {
    this.cardNumber = cardNumber;
  }
}

