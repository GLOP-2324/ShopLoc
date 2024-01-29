import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  }
}