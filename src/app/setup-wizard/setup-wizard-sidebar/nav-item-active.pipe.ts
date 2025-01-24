import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navItemActive'
})
export class NavItemActivePipe implements PipeTransform {

  transform(url: string, checkIncludesUrlSegment: string): undefined | 'section-active' {
    if (url.includes(checkIncludesUrlSegment)) {
      return 'section-active';
    }
    return undefined;
  }
}
