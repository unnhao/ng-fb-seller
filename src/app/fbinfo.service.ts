import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account, Live, AuthResponse } from './types';
@Injectable({
  providedIn: 'root'
})
export class FbinfoService {

  constructor(private http: HttpClient) { }
  authResponse: AuthResponse;
  accountInfo: Account;
  liveInfo: Live;

  getAuthResponse() {
    return this.authResponse;
  }

  setAuthResponse(userinfo) {
    this.authResponse = userinfo;
  }

  setAccountInfo(accountinfo: Account) {
    this.accountInfo = accountinfo;
  }
  setLiveInfo(liveinfo: Live) {
    this.liveInfo = liveinfo;
  }

  getUserInfo() {
    const url = `https://graph.facebook.com/${this.authResponse.userID}?fields=id,name&access_token=${this.authResponse.accessToken}`;
    return this.http.get(url);
  }

  getUserAccounts() {
    const url = `https://graph.facebook.com/${this.authResponse.userID}?fields=accounts&access_token=${this.authResponse.accessToken}`;
    return this.http.get(url);
  }

  getAccountInfo() {
    return this.accountInfo;
  }

  getLiveInfo() {
    return this.liveInfo;
  }

  getAccountPosts() {
    const url = `https://graph.facebook.com/${this.accountInfo.id}?fields=posts&access_token=${this.accountInfo.access_token}`;
    return this.http.get(url);
  }

  getAccountLives() {
    const url = `https://graph.facebook.com/${this.accountInfo.id}?fields=live_videos&access_token=${this.accountInfo.access_token}`;
    return this.http.get(url);
  }

  getLiveDescInfo(liveid) {
    const url = `https://graph.facebook.com/${liveid}?fields=description&access_token=${this.accountInfo.access_token}`;
    return this.http.get(url);
  }

  getLiveViewsInfo(liveid) {
    const url = `https://graph.facebook.com/${liveid}?fields=live_views&access_token=${this.accountInfo.access_token}`;
    return this.http.get(url);
  }

  getLiveComments(liveid) {
    const url = `https://graph.facebook.com/${liveid}?fields=comments&access_token=${this.accountInfo.access_token}`;
    return this.http.get(url);
  }

  getPageToken(pageid) {
    const url = `https://graph.facebook.com/v4.0/${pageid}}?fields=access_token&access_token=${this.authResponse.accessToken}`;
    return this.http.get(url);
  }

  replyLiveComments(commentid, message) {
    const formData: FormData = new FormData();
    const url = `https://graph.facebook.com/v4.0/${commentid}/comments?access_token=${this.accountInfo.access_token}`;
    formData.append('message', message);
    formData.append('debug', 'all');
    formData.append('format', 'json');
    formData.append('pretty', '0');
    formData.append('suppress_http_code', '1');
    formData.append('transport', 'cors');
    return this.http.post(url, formData);
  }

  replyMessage(commentid, message) {
    const formData: FormData = new FormData();
    console.log('commentid:' + commentid);
    console.log('message:' + message);
    const url = `https://graph.facebook.com/v4.0/private_replies?access_token=${this.accountInfo.access_token}`;
    formData.append('id', commentid);
    formData.append('message', message);
    return this.http.post(url, formData);
  }

  formatIframe(ifrmaeTag: string): {
    src: string;
    width: string;
    height: string;
  } {
    const iframe = ifrmaeTag;
    const regEx = /(src|width|height)=["']([^"']*)["']/gi;
    const res: {
      src: string;
      width: string;
      height: string;
    } = {
      src: '',
      width: '',
      height: ''
    };
    res.src = iframe.match(regEx)[0].split('src=')[1].slice(1, -1);
    res.width = iframe.match(regEx)[1].split('width=')[1].slice(1, -1);
    res.height = iframe.match(regEx)[2].split('height=')[1].slice(1, -1);
    return res;
  }
}
