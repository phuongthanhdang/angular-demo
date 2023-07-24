import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  categories = [
    { name: 'home', link: '#' },
    { name: 'trending', link: '#trending' },
    { name: 'destination', link: '#destination' },
    { name: 'testimonials', link: '#testimonials' },
    { name: 'product', link: '/product' },
    // { name: 'login', link: '/login' },
    // { name: 'register', link: '/register' },
  ];
  visible = false;
  showMenu = false;
  isLoggedIn = false;
  username?: string;
  token: any;
  message = false;
  errorMessage = '';
  dem = 0;
  countCart: any;
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
      this.token = user.data.accessToken;
      this.username = user.data.username;
      this.authService.getCountCart(this.token).subscribe(
        (data) => {
          this.message = true;
          this.countCart = data;
          this.countCart = this.countCart.data.product;
          this.countCart.forEach((element: any) => {
            console.log('element', element);
            this.dem += element.quantity;
          });
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    }

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
  profile() {
    this.router.navigate(['/profile']);
  }
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  giohang() {
    this.router.navigate(['/giohang']);
  }
}
