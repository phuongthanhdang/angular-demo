import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  form: any = {
    newPass: null,
  };
  message = false;
  errorMessage = '';
  href = '';
  id = '';
  dataRequest: any;

  tmp: any;
  param: any;
  iv = '';
  encryptedData = '';

  ngOnInit(): void {
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
  }
  onSubmit(): void {
    const { newPass } = this.form;
    console.log(newPass);
    this.iv = this.dataRequest[0];
    this.encryptedData = this.dataRequest[1];
    this.authService.newPass(this.iv, this.encryptedData, newPass).subscribe(
      (data) => {
        this.message = true;
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
