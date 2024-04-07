import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../../shared/service/accountService"
import {ToastrService} from "ngx-toastr";
import {Role} from "../../shared/model/Role";
import {formatDate} from "@angular/common";

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
        email: '',
        role:''
    });

    accountToCreate: any;
    rightRole: number | undefined;

    createAccount(role: String) {
      const newFormData= new FormData();
        this.accountToCreate = this.accountForm.getRawValue();
        if (role === 'Client') {
            this.accountToCreate.role=this.rightRole = 3;
        } else {
          this.accountToCreate.role = 2;
        }
        if (this.accountForm.get('firstname')?.value !== "" && this.accountForm.get('lastname')?.value !== "" && this.accountForm.get('email')?.value !== "") {
          newFormData.append('firstname',this.accountToCreate.firstname );
          newFormData.append('lastname', this.accountToCreate.lastname );
          newFormData.append('email', this.accountToCreate.email );
          newFormData.append('roleId',  this.accountToCreate.role);
          this.accountService.createAccount(newFormData).subscribe((response: any) => {

                this.toastr.success("Le compte à été crée");
                this.accountForm.reset();
            })
          this.accountForm.reset();
        } else {
            this.toastr.error("Veuillez remplir tous les champs requis");
        }
    }
}


