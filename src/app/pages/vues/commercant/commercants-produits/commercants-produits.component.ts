import { Component } from '@angular/core';

@Component({
  selector: 'app-commercants-produits',
  templateUrl: './commercants-produits.component.html',
  styleUrls: ['./commercants-produits.component.css']
})
export class CommercantsProduitsComponent {
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
