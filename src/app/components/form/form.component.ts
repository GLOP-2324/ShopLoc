import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../shared/service/accountService";
import { ToastrService } from "ngx-toastr";
import { StoreService } from "../../shared/service/StoreService";

import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import {Account} from "../../shared/model/Account";
import {SharedService} from "../../shared/service/SharedService";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  modal: boolean | undefined;
  selectedFile: File | null = null;
  form: FormGroup = this.fb.group({});
  dynamicControls: { label: string, formControlName: string, type: string }[] = [];
  titreForm = "";
  route = "";
  typesProduits: any = [];
  currentRoute: string = '';
  montantCredit:any;

  protected readonly localStorage = localStorage;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {
    // @ts-ignore
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {

      this.currentRoute = event.url; // Update current route
      this.updateDynamicControls(this.currentRoute);
    });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.updateDynamicControls(this.currentRoute);
    this.initForm();
    this.sharedService.getCurrentObject().subscribe((currentObject) => {
      if (currentObject) {
        this.updateFormWithObject(currentObject);

      }
    });

  }
  updateFormWithObject(object: any): void {
    console.log('Value of benefitsActivated:', object.benefitsActivated);

    // Mettre à jour le champ benefitsActivated
    const benefitsActivatedControl = this.form.get('benefitsActivated');
    if (benefitsActivatedControl) {
      benefitsActivatedControl.setValue(object.benefitsActivated);
    }

    // Mettre à jour les autres champs
    if (object) {
      Object.keys(object).forEach((key) => {
        // Ignorer le champ benefitsActivated car il a déjà été mis à jour
        if (key !== 'benefitsActivated') {
          const control = this.form.get(key);

          // Special handling for 'type'
          if (key === 'type' && this.typesProduits) {
            const selectedTypeId = object.type.id;
            const selectedTypeObj = this.typesProduits.find((type: { id: any }) => type.id === selectedTypeId);
            if (selectedTypeObj) {
              // @ts-ignore
              control.setValue(selectedTypeObj.id);
            }
          } else if (control) {
            // Set the value for other form controls
            control.setValue(object[key]);
          }
        }
      });
    }
  }


  private initForm() {
    const formGroupConfig = {};
    // @ts-ignore
    this.dynamicControls.forEach(control => {
      console.log(control)
      if (control.type === 'hidden'&& control.formControlName === 'store') {
        // @ts-ignore
        formGroupConfig[control.formControlName] = [localStorage.getItem("email"), Validators.required];
      }
      else if (control.type === 'checkbox') {
        // @ts-ignore
        formGroupConfig[control.formControlName] = [false]}
      else {
        // @ts-ignore
        formGroupConfig[control.formControlName] = [null, Validators.required];
      }
    });

    this.form = this.fb.group(formGroupConfig);
    const checkboxControl = this.form.get('benefitsActivated');
    if (checkboxControl) {
      checkboxControl.valueChanges.subscribe(value => {
        checkboxControl.setValue(!!value, { emitEvent: false });
      });
    }
  }

  private updateDynamicControls(currentRoute: string): void {
    if (currentRoute.startsWith('/admin')) {
      this.route = "admin"
      this.titreForm = "Ajout d'un commerçant"
      this.dynamicControls = [
        { label: 'Name', formControlName: 'lastname', type: 'text' },
        { label: 'Ville', formControlName: 'firstname', type: 'text' },
        { label: 'Email', formControlName: 'email', type: 'email' },
        { label: 'Image', formControlName: 'image', type: 'file' },
        { label: 'Adresse', formControlName: 'address', type: 'text' },

      ];
    } else if (currentRoute.startsWith('/commercant/produits')) {
      this.route = "commercant/produits"
      this.titreForm = "Ajout d'un produit"
      this.storeService.getTypeProduct().subscribe((types) => {
        this.typesProduits = types;
      });
      this.dynamicControls = [
        { label: 'Avantage', formControlName: 'benefitsActivated', type: 'checkbox' },
        { label: 'Libelle', formControlName: 'libelle', type: 'text' },
        { label: 'Prix', formControlName: 'price', type: 'number' },
        { label: 'Image', formControlName: 'image', type: 'file' },
        { label: 'Description', formControlName: 'description', type: 'textarea' },
        { label: 'Type', formControlName: 'type', type: 'select' },
        { label: 'Points', formControlName: 'points', type: 'number' },
        { label: 'Store', formControlName: 'store', type: 'hidden' },
        { label: 'Id', formControlName: 'id', type: 'hidden' },
        { label: 'Stock', formControlName:'stock', type:'number'},
      ];
    } else if (currentRoute.startsWith('/commercant/type')) {
      this.route = "commercant/type"
      this.titreForm = "Ajout d'un type de produit"
      this.dynamicControls = [
        { label: 'Libelle', formControlName: 'libelle', type: 'text' },
      ];
    }
    else if (currentRoute.startsWith('/profile')) {
      this.route = "/profile"
      this.titreForm = "Modification du profile"
      this.dynamicControls = [
        { label: 'Nouveau mot de passe', formControlName: 'password', type: 'password' }

      ];
    }
    else if (currentRoute.startsWith('/client/Card')) {
      this.route = "/client/Card"
      this.titreForm = "Recharger la carte"
      this.dynamicControls = [
        { label: 'Montant', formControlName: 'montant', type: 'text' }

      ];
    }
    else {
      this.route = ""
      this.dynamicControls = [];
    }
  }
  onCheckboxChange(event: any): void {
    const isChecked = event.target.checked;
    this.form.get('benefitsActivated')?.setValue(isChecked);
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
      newFormData.append('roleId', role.toString());
      newFormData.append('address', formData.address);
      this.accountService.createAccount(newFormData).subscribe((response: any) => {

        console.log('Success:', response);
        this.toastr.success("Le compte à été crée");
        this.form.reset();
      })
    }
    if (this.route == "commercant/produits") {
      // @ts-ignore
      this.storeService.findSToreByEmail(localStorage.getItem("email")).subscribe((storeData: any) => {
        for (const fieldName in formData) {
          if (formData.hasOwnProperty(fieldName)) {
            const fieldValue = formData[fieldName];
            console.log(`Field: ${fieldName}, Value: ${fieldValue}`);
          }
        }
        if (formData.id !== null && formData.id !== undefined) {
          newFormData.append('id', formData.id);
        }

         newFormData.append('store',  storeData.id);
         newFormData.append('libelle', formData.libelle);
          newFormData.append('description', formData.description);
          newFormData.append('price', formData.price);
          newFormData.append('type', formData.type);
          newFormData.append('points', formData.points);
          newFormData.append('benefitsActivated', formData.benefitsActivated);
          newFormData.append('stock', formData.stock);
          console.log('value:',  newFormData);
          this.storeService.createProduct(newFormData).subscribe((response: any) => {
            console.log('Success:', response);
            this.form.reset();
            this.toastr.success("Le produit a été créé");
            window.location.reload()

          }, (error: any) => {
            console.error('Error creating product:', error);
            this.form.reset();
            this.toastr.error("Une erreur s'est produite lors de la création du produit");
          });

      }, (error: any) => {
        this.form.reset();
        console.error('Error fetching store by email:', error);
        this.toastr.error("Une erreur s'est produite lors de la recherche du magasin par e-mail");
      });
    }

    if (this.route == "commercant/type") {
      this.storeService.createTypeProduct(formData).subscribe((response: any) => {
        console.log('Success:', response);
        this.toastr.success("Le type à été crée");
        window.location.reload()
        this.form.reset();

      })
    }
    if (this.route == "/profile") {
      const account = new Account();
      account.password = this.form.get("password")?.value;
      account.email=this.localStorage.getItem("email") || undefined;
      this.accountService.modifyPassword(account).subscribe((response:any)=>{
        this.form.reset();
      })
    }
    if(this.route=='/client/Card'){
      this.modal= true
      this.montantCredit=formData.montant
      alert(this.modal)
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
  }
  recharger(){
    alert(this.montantCredit);
  }
}
