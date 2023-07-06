import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: any = {
    email: null,
  };
  isLoggedIn = false;
  roles: string[] = [];
  errorMessage = '';
  message = false;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}
  ngOnInit(): void {
    console.log('hihi');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().data.role;
      console.log('role', this.tokenStorage.getUser().data.role);
    }
  }
  onSubmit(): void {
    const { email } = this.form;

    this.authService.forgotPass(email).subscribe(
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
