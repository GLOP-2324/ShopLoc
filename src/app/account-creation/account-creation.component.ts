import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../shared/service/accountService"
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {


  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private toastr: ToastrService) {
  }

  accountForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: ''
  });

  accountToCreate: any;

  createAccount() {
    this.accountToCreate = this.accountForm.getRawValue();
    console.log(this.accountToCreate)
    if (this.accountForm.get('firstname')?.value !== null && this.accountForm.get('lastname')?.value !== null && this.accountForm.get('email')?.value !== null) {
      this.accountService.createAccount(this.accountToCreate).subscribe((response) => {
        this.toastr.success("Le compte à été crée");
          this.accountForm.reset();
        })
    } else {
      this.toastr.error("Veuillez remplir tous les champs requis");
    }
  }
}


