import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) {}
  categories = [
    { name: 'home', link: '#' },
    { name: 'trending', link: '#trending' },
    { name: 'destination', link: '#destination' },
    { name: 'testimonials', link: '#testimonials' },
    // { name: 'login', link: '/login' },
    // { name: 'register', link: '/register' },
  ];
  visible = false;
  showMenu = false;
  isLoggedIn = false;
  username?: string;
  private roles: string[] = [];
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
    console.log('home');
    // debugger;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.data.role;

      this.username = user.data.username;
    }
    console.log('token', this.isLoggedIn);
    return () => {
      window.removeEventListener('scroll', this.toggleVisible);
    };
  }
  onClick() {
    this.showMenu = !this.showMenu;
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
