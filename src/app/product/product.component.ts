import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  name = '';
  price: any;
  message = false;
  errorMessage = '';
  newObj = [];

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.searchProduct(this.name, this.price).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
