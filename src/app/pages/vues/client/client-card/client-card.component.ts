import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {
  route: string;

  constructor(private router: Router) {
    this.route = this.router.url;
  }
}
