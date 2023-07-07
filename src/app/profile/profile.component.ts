import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(
    private token: TokenStorageService,
    private authService: AuthService
  ) {}
  errorMessage = '';
  profile: any;
  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('profile', this.currentUser);
    this.authService.profile().subscribe(
      (data) => {
        this.profile = data;
        console.log('data', this.profile.data);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
