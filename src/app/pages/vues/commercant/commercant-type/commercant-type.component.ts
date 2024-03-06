import { Component } from '@angular/core';

@Component({
  selector: 'app-commercant-type',
  templateUrl: './commercant-type.component.html',
  styleUrls: ['./commercant-type.component.css']
})
export class CommercantTypeComponent {
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
