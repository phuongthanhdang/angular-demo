import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
  href = '';
  param: any;
  dataRequest: any;
  tmp: any;
  message = false;
  errorMessage = '';
  productDetail: any;
  productByLoais: any;
  idLoaiSp: string = '';
  dem = 1;
  token: any;
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
    this.idLoaiSp = this.idLoaiSp ?? '';
    this.authService.getProductDetail(this.dataRequest[0]).subscribe(
      (data) => {
        this.message = true;
        this.productDetail = data;
        this.idLoaiSp = this.productDetail?.data?.loaisp?.id ?? '';
        console.log('productDetail', this.idLoaiSp);
      },
      (err) => {
        this.errorMessage = err.error.message;
      },
      () => {
        console.log('id', this.idLoaiSp);
        if (this.idLoaiSp != '') {
          this.authService.getProducByLoai(this.idLoaiSp).subscribe(
            (data) => {
              this.message = true;

              this.productByLoais = data;
              console.log('productByLoai', this.productByLoais.data);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
        }
      }
    );
  }
  up() {
    this.dem = this.dem + 1;
  }
  down() {
    console.log(this.dem);
    if (this.dem !== 0) {
      this.dem = this.dem - 1;
    } else {
      this.dem = 0;
    }
  }
  addToCart(idProduct: string, count: number) {
    console.log(idProduct, count);
    this.token = this.tokenStorageService.getUser();
    console.log(this.token);
    if (this.token !== null) {
      this.token = this.token.data.accessToken;
      this.authService.addToCart(idProduct, count, this.token).subscribe(
        (data) => {
          this.message = true;
          window.location.reload();
        },
        (err) => {
          this.errorMessage = err.error.message;

          console.log(this.errorMessage);
        }
      );
    } else {
      this.router.navigate(['./login']);
    }
  }
}
