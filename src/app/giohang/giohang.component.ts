import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css'],
})
export class GiohangComponent implements OnInit {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  dem = 0;
  visible = false;
  showMenu = false;
  isLoggedIn = false;
  username?: string;
  token: any;
  message = false;
  errorMessage = '';
  countCart: any;
  thanhtien = 0;
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.token = user.data.accessToken;
      this.username = user.data.username;
      this.authService.getCountCart(this.token).subscribe(
        (data) => {
          this.countCart = data;
          this.countCart = this.countCart.data.product;
          // this.dem = this.countCart.quantity;
          console.log('dem', this.countCart);
          this.countCart.forEach((element: any) => {
            console.log('element', element);
            this.thanhtien += element.quantity * element.price;
          });
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }
  up(id: string, count: number) {
    this.authService.updateCountCart(id, count + 1).subscribe(
      (data) => {
        alert('Update thành công');
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  down(id: string, count: number) {
    this.authService.updateCountCart(id, count - 1).subscribe(
      (data) => {
        alert('Update thành công');
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  delete(id: string) {
    this.authService.deleteCart(id).subscribe(
      (data) => {
        alert('delete thành công');
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
