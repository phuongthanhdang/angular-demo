import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../_services/auth.service';
const SCRIPT_PATH = 'https://apis.google.com/js/api.js';
declare let gapi: any;
@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css'],
})
export class ThanhtoanComponent implements OnInit {
  constructor(private authService: AuthService) {}
  message = false;
  errorMessage = '';
  citys: any;
  districts: any;
  wards: any;
  ngOnInit() {
    this.authService.raedJson().subscribe(
      (data) => {
        this.message = true;
        this.citys = data;
        console.log('tinh/thanh', this.citys);
      },
      (err) => {
        this.errorMessage = err.error.message;

        console.log(this.errorMessage);
      }
    );
  }
  public changeCity(event: any) {
    const value = event.target.value;
    const search = this.citys.filter((data: { Id: any }) => data.Id === value);
    this.districts = search[0].Districts;
    console.log('districts', this.districts);
  }
  public changeDistrits(event: any) {
    const value = event.target.value;
    const search = this.districts.filter(
      (data: { Id: any }) => data.Id === value
    );
    this.wards = search[0].Wards;
    console.log('wards', this.wards);
  }
}
