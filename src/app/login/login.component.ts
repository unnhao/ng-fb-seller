import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbinfoService } from '../fbinfo.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public fbinfoService: FbinfoService) { }

  FB = (window as any).FB;

  ngOnInit() {
    this.FB.getLoginStatus(
      this.loginStatus.bind(this)
    );
  }
  loginStatus(response) {
    console.log(response);
    if (response.status === 'connected') {
      this.fbinfoService.setAuthResponse((response as any).authResponse);
      this.onLoginSuccess();
    }
  }

  onLoginSuccess() {
    this.router.navigate(['userinfo']);
  }

  login() {
    if (this.FB) {
      this.FB.init({
        appId: '551275962300920',
        cookie: true,
        xfbml: true,
        version: 'v4.0'
      });
      setTimeout(() => {
        this.FB.login((response) => {
          this.loginStatus(response);
        }, (response) => {
          console.log('error');
          console.log(response);
        });
      }, 600);
    }
  }
}
