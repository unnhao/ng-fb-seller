import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbinfoService } from '../fbinfo.service';
import { Account } from '../types';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(public router: Router, public fbinfoService: FbinfoService) { }
  id = '';
  name = '';
  accounts: Account[];
  ngOnInit() {
    this.fbinfoService.getUserInfo().subscribe((response: any) => {
      this.id = response.id;
      this.name = response.name;
    });
    this.fbinfoService.getUserAccounts().subscribe((response: any) => {
      this.accounts = response.accounts.data;
    });
  }

  onAccountClick(account: any) {
    this.fbinfoService.setAccountInfo(account);
    this.router.navigate(['accountinfo']);
  }
}
