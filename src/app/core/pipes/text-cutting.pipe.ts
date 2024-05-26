import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCutting',
  standalone: true
})
export class TextCuttingPipe implements PipeTransform {

  transform(text: string,limit:number): string {
    return text.split(' ').slice(0,limit).join(' ');
  }

}
