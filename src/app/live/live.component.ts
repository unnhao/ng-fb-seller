import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FbinfoService } from '../fbinfo.service';
import { Post, Live, Comment } from '../types';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  constructor(
    public router: Router,
    public fbinfoService: FbinfoService,
    public sanitizer: DomSanitizer,
    public cdRef: ChangeDetectorRef
  ) { }
  liveInfo: Live;
  liveDescription: string;
  liveViews = 0;
  iframeSrc: any;
  iframeWidth = '';
  iframeHeight = '';
  FB = (window as any).FB;
  comments: Comment[];
  replyMessage = '範例訊息';

  ngOnInit() {
    this.liveInfo = this.fbinfoService.getLiveInfo();
    this.fbinfoService.getLiveDescInfo(this.liveInfo.id).subscribe((response: any) => {
      this.liveDescription = response.description;
    });
    this.fbinfoService.getLiveViewsInfo(this.liveInfo.id).subscribe((response: any) => {
      this.liveViews = response.live_views;
    });
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.fbinfoService.formatIframe(this.liveInfo.embed_html).src);
    this.iframeWidth = this.fbinfoService.formatIframe(this.liveInfo.embed_html).width;
    this.iframeHeight = this.fbinfoService.formatIframe(this.liveInfo.embed_html).height;
    this.refresh();
  }

  refresh() {
    this.fbinfoService.getLiveComments(this.liveInfo.id).subscribe((response: any) => {
      this.comments = response.comments.data;
    });
  }

  reply(commentid) {
    this.fbinfoService.replyLiveComments(commentid, this.replyMessage, '').subscribe((response: any) => {
      console.log(response);
    });
  }
}
