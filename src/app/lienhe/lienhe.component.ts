import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css'],
})
export class LienheComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 10.749042190359019,
    lng: 106.72877450650316,
  };
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [
    {
      lat: 10.749042190359019,
      lng: 106.72877450650316,
    },
    {
      lat: 10.737562204804258,
      lng: 106.725524068581,
    },
  ];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}
