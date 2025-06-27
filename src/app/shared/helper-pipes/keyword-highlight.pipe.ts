import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keywordHighlight',
  standalone: false,
  pure: false
})
export class KeywordHighlightPipe implements PipeTransform {

  transform(keyword: string, searchStr: string): string {
    if (!searchStr) return keyword;
    const lowerStr = searchStr.toLowerCase();
    return keyword.replace(/\w+/g, (word) => {
      if (word.toLowerCase().startsWith(lowerStr)) {
        return `<b>${word.substring(0, lowerStr.length)}</b>${word.substring(lowerStr.length)}`;
      }
      return word;
    });
  }
}
