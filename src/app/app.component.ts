import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular12JwtAuth';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    console.log('home');
    // debugger;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.data.role;

      this.username = user.data.username;
    }
    console.log('token', this.isLoggedIn);
    // throw new Error('Method not implemented.');
  }
  // gOnInit(): void {
  //   console.log('home');
  //   this.isLoggedIn = !!this.tokenStorageService.getToken();

  //   if (this.isLoggedIn) {
  //     debugger;
  //     const user = this.tokenStorageService.getUser();
  //     this.roles = user.roles;

  //     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  //     this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

  //     this.username = user.username;
  //   }
  //   console.log('token', this.isLoggedIn);
  // }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
