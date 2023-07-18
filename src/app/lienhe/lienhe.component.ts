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
export class LienheComponent implements OnInit, AfterViewInit {
  map: any;
  @ViewChild('mapElement') mapElement: any;

  constructor() {}
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 13.0827, lng: 80.2707 },
      zoom: 14,
    });
  }

  ngOnInit() {}
}
