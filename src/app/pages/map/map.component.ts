import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('originInput') originInput!: ElementRef;
  @ViewChild('destinationInput') destinationInput!: ElementRef;
  @ViewChild('mode') mode!: ElementRef;

  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;
  private autocompleteOrigin!: google.maps.places.Autocomplete;
  private autocompleteDestination!: google.maps.places.Autocomplete;

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBesLK_GsSMaxpkFtxTaJyIFbFru5pA5Wo',
      libraries: ['places']
    });

    loader.load().then(() => {
      this.initializeMap();
      this.initializeAutocomplete();
    });
  }

  private initializeMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 48.8566, lng: 2.3522 }, // Default center (Paris)
      zoom: 15,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      panel: document.getElementById('instructionsPanel')
    });

  }

  private initializeAutocomplete(): void {
    this.autocompleteOrigin = new google.maps.places.Autocomplete(this.originInput.nativeElement, { types: ['geocode'] });
    this.autocompleteDestination = new google.maps.places.Autocomplete(this.destinationInput.nativeElement, { types: ['geocode'] });
  }

  useCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.originInput.nativeElement.value = 'Ma position actuelle';
        },
        () => {
          window.alert("Erreur lors de la récupération de votre position.");
        }
      );
    } else {
      window.alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }

  calculateAndDisplayRoute(): void {
    const origin = this.originInput.nativeElement.value === 'Ma position actuelle' ? 'Ma position actuelle' : this.originInput.nativeElement.value;
    const destination = this.destinationInput.nativeElement.value;

    if (!origin || !destination) {
      window.alert('Veuillez entrer les adresses de départ et d\'arrivée.');
      return;
    }

    this.directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: this.mode.nativeElement.value as google.maps.TravelMode,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK && response) {
        this.directionsRenderer.setDirections(response);
        const durationElement = document.getElementById('duration');
        if (durationElement && response.routes[0]?.legs[0]?.duration) {
          durationElement.innerText = response.routes[0].legs[0].duration.text;
        }
      } else {
        window.alert('La demande d\'itinéraire a échoué en raison de ' + status);
      }
    });
  }

  startNavigation(): void {
    if (!navigator.geolocation) {
      window.alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
      return;
    }

    navigator.geolocation.watchPosition(
      position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };


        this.map.setCenter(currentPosition);

        new google.maps.Marker({
          position: currentPosition,
          map: this.map,
          title: "Votre position",
        });


        this.calculateAndDisplayRouteFromCurrentPosition(currentPosition);
      },
      () => {
        window.alert("Erreur lors de la récupération de votre position.");
      },
      { enableHighAccuracy: true }
    );

    console.log("Navigation started.");
  }

  calculateAndDisplayRouteFromCurrentPosition(currentPosition: google.maps.LatLngLiteral): void {
    const destination = this.destinationInput.nativeElement.value;

    this.directionsService.route({
      origin: currentPosition,
      destination: destination,
      travelMode: this.mode.nativeElement.value as google.maps.TravelMode,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK && response) {
        this.directionsRenderer.setDirections(response);

        const durationElement = document.getElementById('duration');
        if (durationElement && response.routes[0]?.legs[0]?.duration) {
          durationElement.innerText = response.routes[0].legs[0].duration.text;
        }
      } else {
        console.error('La demande d\'itinéraire a échoué en raison de ' + status);
      }
    });
  }

}
