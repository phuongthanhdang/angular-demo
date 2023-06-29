import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories = [
    { name: 'home', link: '#' },
    { name: 'trending', link: '#trending' },
    { name: 'destination', link: '#destination' },
    { name: 'testimonials', link: '#testimonials' },
  ];
  visible = false;
  showMenu = false;
  toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    console.log('scroll', scrolled);
    if (scrolled > 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  };
  ngOnInit() {
    console.log(this.categories);
    window.addEventListener('scroll', this.toggleVisible);
    return () => {
      window.removeEventListener('scroll', this.toggleVisible);
    };
  }
  onClick() {
    this.showMenu = !this.showMenu;
  }
}
