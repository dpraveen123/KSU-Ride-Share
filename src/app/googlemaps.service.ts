import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() { }

  initializeMap(mapElement: HTMLElement) {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    };
    const map = new google.maps.Map(mapElement, mapOptions);
    return map;
  }
}
