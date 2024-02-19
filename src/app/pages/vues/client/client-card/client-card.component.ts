import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../shared/model/Account";
import {ClientCardService} from "../../../../shared/service/clientCardService";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {
  montantCredit:any;
  route: string;
  protected readonly localStorage = localStorage;
  public firstname="";
  public lastname="";
  titreForm = 'Ajout d\'un montant';
  form: FormGroup;
  constructor(private router: Router,private clientCardService:ClientCardService) {
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
    alert(this.montantCredit);
  }
  onSubmit() {
    const formData = this.form.value;
      this.montantCredit=formData.montant
      // @ts-ignore
    this.clientCardService.creditCard(this.localStorage.getItem("email"),this.montantCredit);
  }
}

