import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private authService: AuthService) {}
  href = '';
  param: any;
  dataRequest: any;
  tmp: any;
  message = false;
  errorMessage = '';
  productDetail: any;
  ngOnInit() {
    (this.href = document.location.href),
      (this.param = this.href.split('?')[1].split('&'));
    this.dataRequest = this.dataRequest || [];
    this.param.forEach((_pa: any) => {
      // console.log('_pa', _pa.split('='));
      this.tmp = _pa.split('=');
      if (typeof this.dataRequest !== 'undefined') {
        this.dataRequest.push(this.tmp[1]);
      }
    });

    console.log(this.dataRequest[0]);
    this.authService.getProductDetail(this.dataRequest[0]).subscribe(
      (data) => {
        this.message = true;

        this.productDetail = data;
        console.log('productDetail', this.productDetail.data);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
