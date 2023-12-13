import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../shared/service/accountService";
import { ToastrService } from "ngx-toastr";
import { StoreService } from "../../shared/service/StoreService";

import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  selectedFile: File | null = null;
  form: FormGroup = this.fb.group({});
  dynamicControls: { label: string, formControlName: string, type: string }[] = [];
  titreForm = "";
  route = "";
  typesProduits: any = [];
  currentRoute: string = '';

  protected readonly localStorage = localStorage;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private storeService: StoreService,
    private toastr: ToastrService,
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
  }

  private initForm() {
    const formGroupConfig = {};
    this.dynamicControls.forEach(control => {
      if (control.type === 'hidden') {
        // @ts-ignore
        formGroupConfig[control.formControlName] = [localStorage.getItem("email"), Validators.required];
      } else {
        // @ts-ignore
        formGroupConfig[control.formControlName] = [null, Validators.required];
      }
    });

    this.form = this.fb.group(formGroupConfig);
  }

  private updateDynamicControls(currentRoute: string): void {
    if (currentRoute.startsWith('/admin')) {
      this.route = "admin"
      this.titreForm = "Ajout d'un commerçant"
      this.dynamicControls = [
        { label: 'Nom', formControlName: 'lastname', type: 'text' },
        { label: 'Prenom', formControlName: 'firstname', type: 'text' },
        { label: 'Email', formControlName: 'email', type: 'email' },
        { label: 'Image', formControlName: 'image', type: 'file' },
      ];
    } else if (currentRoute.startsWith('/commercant/produits')) {
      this.route = "commercant/produits"
      this.titreForm = "Ajout d'un produit"
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
        { label: 'Nom', formControlName: 'lastname', type: 'text' },
        { label: 'Prenom', formControlName: 'firstname', type: 'number' },
        { label: 'Image', formControlName: 'image', type: 'file' },
        { label: 'Mot de passe', formControlName: 'password', type: 'password' },

      ];
    }else {
      this.route = ""
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

      newFormData.append('roleId', role.toString());
      this.accountService.createAccount(newFormData).subscribe((response: any) => {

        console.log('Success:', response);
        this.toastr.success("Le compte à été crée");
        this.form.reset();
      })
    }
    if (this.route == "commercant/produits") {
      this.storeService.findSToreByEmail(formData.store).subscribe((storeData: any) => {
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
    if (this.route == "/profile") {
      console.log("Updating User : prendre directement le Formdata (s'inspirer de la ligne 155)")
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
  }
}
