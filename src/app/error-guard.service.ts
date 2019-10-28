import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { FbinfoService } from './fbinfo.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorGuardService implements CanActivate, CanActivateChild {

  constructor(private fbinfoService: FbinfoService, private router: Router) { }

  canActivate() {
    let access = true;
    if (!this.fbinfoService.getAuthResponse()) {
      access = false;
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 500);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate, CanActivateChild {

  constructor(private fbinfoService: FbinfoService) { }

  canActivate() {
    let access = true;
    if (!(window as any).FB) {
      access = false;
    }
    return access;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }
}
