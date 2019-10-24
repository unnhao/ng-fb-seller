import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'iframeSrc' })
export class IframeSrcPipe implements PipeTransform {
  transform(ifrmaeTag: string): {
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
