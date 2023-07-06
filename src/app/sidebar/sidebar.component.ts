import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  images = [
    'https://raw.githubusercontent.com/devat-youtuber/travel-nextjs13beta-images/main/bn1.jpg',
    'https://raw.githubusercontent.com/devat-youtuber/travel-nextjs13beta-images/main/bn2.jpg',
    'https://raw.githubusercontent.com/devat-youtuber/travel-nextjs13beta-images/main/bn3.jpg',
  ];
}
