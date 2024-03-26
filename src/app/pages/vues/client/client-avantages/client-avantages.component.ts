import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../../../shared/service/clientService";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client-avantages',
  templateUrl: './client-avantages.component.html',
  styleUrls: ['./client-avantages.component.css']
})
export class ClientAvantagesComponent implements OnInit{


    status_vfp: boolean;
    avantage: number | null = null;
  ngOnInit() {
    // @ts-ignore
    this.avantage = parseInt(localStorage.getItem("avantage"), 10);

  }
  constructor( private clientService: ClientService,private toastr: ToastrService) {
    const storedValue = localStorage.getItem("vfp");
    this.status_vfp = !!storedValue && storedValue.toLowerCase() === 'true';
  }
choose_parking() {
  let avantage = 2;
  // @ts-ignore
  this.clientService.chooseClientAdvantage(localStorage.getItem("email"), avantage).subscribe((response: any) => {
    console.log('Success:', response);

    localStorage.setItem("avantage",response.avantage.avantage_id)
    this.toastr.success("Le commercant a été supprimé");
    window.location.reload()

  })
}
choose_transport(){
  let avantage = 3;
  // @ts-ignore
  this.clientService.chooseClientAdvantage(localStorage.getItem("email"), avantage).subscribe((response: any) => {
    console.log('Success:', response);
    localStorage.setItem("avantage",response.avantage.avantage_id)
    this.toastr.success("Le commercant a été supprimé");
    window.location.reload()

  })
}
}
