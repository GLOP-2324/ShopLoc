import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../../shared/service/accountService"
import {ToastrService} from "ngx-toastr";
import {Role} from "../../shared/model/Role";

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
    rightRole: number | undefined;

    createAccount(role: String) {
        this.accountToCreate = this.accountForm.getRawValue();
        if (role === 'Client') {
            this.rightRole = 3;
        } else {
            this.rightRole = 2;
        }
        if (this.accountForm.get('firstname')?.value !== "" && this.accountForm.get('lastname')?.value !== "" && this.accountForm.get('email')?.value !== "") {
            this.accountService.createAccount(this.accountToCreate, this.rightRole).subscribe((response: any) => {
                this.toastr.success("Le compte à été crée");
                this.accountForm.reset();
            })
          this.accountForm.reset();
        } else {
            this.toastr.error("Veuillez remplir tous les champs requis");
        }
    }
}


