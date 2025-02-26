import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPlaceholderText',
  standalone: false
})
export class FormatPlaceholderTextPipe implements PipeTransform {

  transform(helpText: string): string {
    return helpText.replaceAll('<br>', '').replace(/\s+/g, ' ');
  }

}
