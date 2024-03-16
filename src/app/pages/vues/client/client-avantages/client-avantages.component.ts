import { Component } from '@angular/core';

@Component({
  selector: 'app-client-avantages',
  templateUrl: './client-avantages.component.html',
  styleUrls: ['./client-avantages.component.css']
})
export class ClientAvantagesComponent {
    // localstorage = localStorage.getItem("status_vfp")
    testTrue=true
    testFalse=false
    status_vfp=this.testTrue
}
