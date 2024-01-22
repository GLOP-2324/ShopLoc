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

    // Marker for Lille, France
    const lilleMarker = L.marker([50.6292, 3.0573]).addTo(map);
    lilleMarker.bindPopup('<b>Lille, France</b>').openPopup();

    // Marker for another location
    const anotherLocationMarker = L.marker([51.5074, -0.1278]).addTo(map);
    anotherLocationMarker.bindPopup('<b>Another Location</b>').openPopup();
  }
}