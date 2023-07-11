import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  name = '';
  price: any;
  message = false;
  errorMessage = '';
  products: any;
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
    console.log(this.content);
    this.authService.searchProduct(this.name, this.price).subscribe(
      (data) => {
        // console.log(JSON.stringify(data));
        this.products = data;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
