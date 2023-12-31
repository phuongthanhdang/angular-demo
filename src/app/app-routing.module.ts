import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { GiohangComponent } from './giohang/giohang.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'forgotpassword', component: ForgotPassComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'gioithieu', component: GioithieuComponent },
  { path: 'lienhe', component: LienheComponent },
  { path: 'giohang', component: GiohangComponent },
  { path: 'thanhtoan', component: ThanhtoanComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
