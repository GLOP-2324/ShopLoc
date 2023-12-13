import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import {AccountService} from "../../shared/service/accountService";
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../shared/service/StoreService";
import {forkJoin} from "rxjs";
import {Store} from "../../shared/model/Store";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit{
  selectedFile: File | null = null;
    form: FormGroup = this.fb.group({});
    dynamicControls: { label: string, formControlName: string, type: string }[] = [];
    titreForm="";
    route="";
  typesProduits: any = [];


  protected readonly localStorage = localStorage;
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

  }
    private initForm() {
        const formGroupConfig = {};
        this.dynamicControls.forEach(control => {
            // @ts-ignore
          if (control.type === 'hidden') {

            // @ts-ignore
            formGroupConfig[control.formControlName] = [localStorage.getItem("email") , Validators.required];
          } else {
            // @ts-ignore
            formGroupConfig[control.formControlName] = [null, Validators.required];
          }
        });

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
        { label: 'Image', formControlName: 'image', type: 'file' },
      ];
    }
    else if(currentRoute.startsWith('/commercant/produits')){

      this.route="commercant/produits"
      this.titreForm="Ajout d'un produit"
      this.storeService.getTypeProduct().subscribe((types) => {
        this.typesProduits = types;
      });
      this.dynamicControls = [
        { label: 'Libelle', formControlName: 'libelle', type: 'text' },
        { label: 'Prix', formControlName: 'price', type: 'number' },
        { label: 'Image', formControlName: 'image', type: 'file' },
        { label: 'Description', formControlName: 'description', type: 'text-area' },
        { label: 'Type', formControlName: 'type', type: 'select' },
        { label: 'Store', formControlName: 'store', type: 'hidden' },
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
    const newFormData = new FormData();

    if (this.selectedFile) {
      newFormData.append('image', this.selectedFile);
    }
    if (this.route == "admin") {
      var role = 2
      newFormData.append('firstname', formData.firstname);
      newFormData.append('lastname', formData.lastname);
      newFormData.append('email', formData.email);
      // Append roleId to FormData
      newFormData.append('roleId', role.toString());
      this.accountService.createAccount(newFormData).subscribe((response: any) => {

        console.log('Success:', response);
        this.toastr.success("Le compte à été crée");
        this.form.reset();
      })
    }
    if (this.route == "commercant/produits") {
      this.storeService.findSToreByEmail(formData.store).subscribe((storeData: any) => {
        this.storeService.getTypeProductById(formData.type).subscribe((typeProduct: any) => {
          newFormData.append('store',  storeData.id);
          newFormData.append('libelle', formData.libelle);
          newFormData.append('description', formData.description);
          newFormData.append('price', formData.price);
          newFormData.append('type', formData.type);
          console.log('value:',  newFormData);
          this.storeService.createProduct(newFormData).subscribe((response: any) => {
            console.log('Success:', response);
            this.toastr.success("Le produit a été créé");

          }, (error: any) => {
            console.error('Error creating product:', error);
            this.toastr.error("Une erreur s'est produite lors de la création du produit");
          });
        }, (error: any) => {
          console.error('Error fetching typeProduct by id:', error);
          this.toastr.error("Une erreur s'est produite lors de la recherche de l'objet TypeProduct par l'id");
        });
      }, (error: any) => {
        console.error('Error fetching store by email:', error);
        this.toastr.error("Une erreur s'est produite lors de la recherche du magasin par e-mail");
      });
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
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
  }
}
