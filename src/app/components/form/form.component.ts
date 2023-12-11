import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import {AccountService} from "../../shared/service/accountService";
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../shared/service/StoreService";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
    form: FormGroup = this.fb.group({});
    dynamicControls: { label: string, formControlName: string, type: string }[] = [];
    titreForm="";
    route="";
  typesProduits: any = [];
  constructor(private fb: FormBuilder,private router: Router, private accountService: AccountService,
              private storeService:StoreService,
              private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd event:', event);
        this.updateDynamicControls(event.url);
        this.initForm();
      }
    });
  }
  ngOnInit() {
    this.storeService.getTypeProduct().subscribe((types) => {
      this.typesProduits = types;
    });
  }
    private initForm() {
        const formGroupConfig = {};
        this.dynamicControls.forEach(control => {
            // @ts-ignore
            formGroupConfig[control.formControlName] = [null, Validators.required];
        });
        // @ts-ignore
      formGroupConfig['typeProduit'] = [null, Validators.required];
        this.form = this.fb.group(formGroupConfig);
    }

  private updateDynamicControls(currentRoute: string): void {
    console.log('Updating dynamic controls. Current route:', currentRoute);
    if (currentRoute.startsWith('/admin')) {
      this.route="admin"
      this.titreForm="Ajout d'un commerçant"
      this.dynamicControls = [
        { label: 'Nom', formControlName: 'lastname', type: 'text' },
        { label: 'Prenom', formControlName: 'firstname', type: 'text' },
        { label: 'Email', formControlName: 'email', type: 'email' },
      ];
    }
    else if(currentRoute.startsWith('/commercant/produits')){
      this.route="commercant/produits"
      this.titreForm="Ajout d'un produit"
      this.dynamicControls = [
        { label: 'Libelle', formControlName: 'libelle', type: 'text' },
        { label: 'Prix', formControlName: 'price', type: 'number' },
        { label: 'Image', formControlName: 'image', type: 'file' },
        { label: 'Description', formControlName: 'description', type: 'text-area' },
        { label: 'Type', formControlName: 'types', type: 'select' },
      ];

    }
    else if(currentRoute.startsWith('/commercant/type')){
      this.route="commercant/type"
      this.titreForm="Ajout d'un type de produit"
      this.dynamicControls = [
        { label: 'Libelle', formControlName: 'libelle', type: 'text' },
      ];
    }
    else {
     this.route=""
      this.dynamicControls = [];
    }
  }


  onSubmit() {
    const formData = this.form.value;
    if (this.route == "admin") {
      var role = 2
      this.accountService.createAccount(formData, role).subscribe((response: any) => {
        console.log('Success:', response);
        this.toastr.success("Le compte à été crée");
        this.form.reset();
      })
    }
    if (this.route == "commercant/produits") {
      this.storeService.createProduct(formData).subscribe((response: any) => {
        console.log('Success:', response);
        this.toastr.success("Le produit à été crée");
        this.form.reset();
      })
    }
    if (this.route == "commercant/type") {
      this.storeService.createTypeProduct(formData).subscribe((response: any) => {
        console.log('Success:', response);
        this.toastr.success("Le type à été crée");
        this.form.reset();
      })
    }
    else {
      this.toastr.error("Veuillez remplir tous les champs requis");
    }

  }
}
