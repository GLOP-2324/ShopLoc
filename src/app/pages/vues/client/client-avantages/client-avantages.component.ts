import { Component } from '@angular/core';
import {ClientService} from "../../../../shared/service/clientService";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client-avantages',
  templateUrl: './client-avantages.component.html',
  styleUrls: ['./client-avantages.component.css']
})
export class ClientAvantagesComponent {


    status_vfp: string | null;
    constructor( private clientService: ClientService,private toastr: ToastrService) {
      this.status_vfp=localStorage.getItem("vfp")
      alert(this.status_vfp)
    }

choose_parking() {
  let avantage = 2;
  // @ts-ignore
  this.clientService.chooseClientAdvantage(localStorage.getItem("email"), avantage).subscribe((response: any) => {
    console.log('Success:', response);
    localStorage.getItem("avantage",response.)
    this.toastr.success("Le commercant a été supprimé");
    window.location.reload()

  })
}
choose_transport(){
  let avantage = 3;
  // @ts-ignore
  this.clientService.chooseClientAdvantage(localStorage.getItem("email"), avantage).subscribe((response: any) => {
    console.log('Success:', response);
    this.toastr.success("Le commercant a été supprimé");
    window.location.reload()

  })
}
}
