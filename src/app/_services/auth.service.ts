import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
  url: any;
  requestOptions: any;
  token: any;

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
  forgotPass(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/send-password-reset-link',
      {
        email,
      },
      httpOptions
    );
  }
  newPass(iv: string, encryptedData: string, newPass: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/forgot-password-email',
      {
        iv,
        encryptedData,
        newPass,
      },
      httpOptions
    );
  }
  searchProduct(name: string, price: number) {
    return this.http.post(
      AUTH_API + '/product/search-product',
      {
        name,
        price,
      },
      httpOptions
    );
  }
  profile() {
    this.token = this.tokenStorageService.getUser().data.accessToken;

    return this.http.post(
      AUTH_API + '/auth/information',
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
  getProductDetail(id: string) {
    return this.http.get(AUTH_API + '/product/' + id, {});
  }
  getProducByLoai(id: string) {
    return this.http.post(AUTH_API + '/product/loaisp/' + id, {}, httpOptions);
  }
  addToCart(idProduct: string, count: number, token: string) {
    // this.token = this.tokenStorageService.getUser().data.accessToken;

    return this.http.post(
      AUTH_API + '/cart/add-cart',
      { idProduct, count },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
  getCountCart(token: string) {
    // this.token = this.tokenStorageService.getUser().data.accessToken;
    return this.http.post(
      AUTH_API + '/cart/get-cart',
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
  updateCountCart(id: string, count: number) {
    return this.http.post(
      AUTH_API + '/cart/update-cart',
      {
        id,
        count,
      },
      httpOptions
    );
  }

  deleteCart(id: string) {
    return this.http.post(
      AUTH_API + '/cart/delete-cart',
      {
        id,
      },
      httpOptions
    );
  }
  raedJson(): Observable<any> {
    return this.http.get(
      'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
      { responseType: 'json' }
    );
  }
}
