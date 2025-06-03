import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keywordHighlight',
  standalone: false,
  pure: false
})
export class KeywordHighlightPipe implements PipeTransform {

  transform(keyword: string, searchStr: string): string {
    if (!searchStr) return keyword;
    const idx = keyword.toLowerCase().indexOf(searchStr.toLowerCase());
    if (idx === -1) return keyword;
    const before = keyword.substring(0, idx);
    const match = keyword.substring(idx, idx + searchStr.length);
    const after = keyword.substring(idx + searchStr.length);
    return `${before}<b>${match}</b>${after}`;
  }

}
