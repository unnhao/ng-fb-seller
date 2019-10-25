import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { LiveComponent } from './live/live.component';
import { AccountComponent } from './account/account.component';
import { ErrorGuardService, LoginGuardService} from './error-guard.service';
const routes: Routes = [
  { path: 'liveinfo', component: LiveComponent, canActivate: [ErrorGuardService]},
  { path: 'userinfo', component: UserInfoComponent, canActivate: [ErrorGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'accountinfo', component: AccountComponent, canActivate: [ErrorGuardService]},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      enableTracing: false,
    } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
