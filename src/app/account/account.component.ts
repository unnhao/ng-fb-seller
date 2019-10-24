import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbinfoService } from '../fbinfo.service';
import { Post, Live } from '../types';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public router: Router, public fbinfoService: FbinfoService, public sanitizer: DomSanitizer) { }
  posts: Post[];
  lives: Live[];
  safeUrl: any;
  accountInfo: { name: string, id: string };
  ngOnInit() {
    this.lives = [];
    this.accountInfo = this.fbinfoService.getAccountInfo();
    this.fbinfoService.getAccountPosts().subscribe((response: any) => {
      this.posts = response.posts.data;
    });

    this.fbinfoService.getAccountLives().subscribe((response: any) => {
      response.live_videos.data.map(live => {
        this.fbinfoService.getLiveDescInfo(live.id).subscribe((liveinfo: any) => {
          this.lives.push(Object.assign(live, {
            ...liveinfo
          }));
        });
      });
    });
  }

  cleanURL(oldURL) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
  onLiveClick(live) {
    this.fbinfoService.setLiveInfo(live);
    this.router.navigate(['liveinfo']);
  }
}
