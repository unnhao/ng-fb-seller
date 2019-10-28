import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-fb-sell';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    (window as any).FB.init({
      appId: '551275962300920',
      cookie: true,
      xfbml: true,
      version: 'v4.0'
    });
  }
}
