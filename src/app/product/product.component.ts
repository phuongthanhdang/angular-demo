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
  products: any;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.searchProduct(this.name, this.price).subscribe(
      (data) => {
        // console.log(JSON.stringify(data));
        this.products = data;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );

    // this.product = this.product || [];
    // this.product.forEach((element: any) => {
    //   if (typeof this.product !== 'undefined') {
    //     console.log('product', this.product);
    //   }
    // });
  }
}
