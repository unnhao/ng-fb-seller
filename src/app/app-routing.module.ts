import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { LiveComponent } from './live/live.component';
import { AccountComponent } from './account/account.component';
const routes: Routes = [
  { path: 'liveinfo', component: LiveComponent },
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accountinfo', component: AccountComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
