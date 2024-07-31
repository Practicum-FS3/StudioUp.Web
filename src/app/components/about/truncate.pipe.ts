import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    const ellipsis = '...';

    if (value.length <= maxLength) {
      return value;
    }
    let truncatedString = value.substring(0, maxLength - ellipsis.length);
    const lastSpaceIndex = truncatedString.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      truncatedString = truncatedString.substring(0, lastSpaceIndex);
    }
    truncatedString=truncatedString + ellipsis + '\u00A0'+ellipsis+'\u00A0'+ellipsis+'\u00A0';
    console.log({truncatedString});
    
    return truncatedString ; 
  }
}
