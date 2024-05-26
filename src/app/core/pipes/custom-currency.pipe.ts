import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'EGP'): string {

    if (isNaN(value)) {
     return '';
   }
   
   const formattedValue = value.toFixed(2);

   return `${formattedValue} ${currencyCode}`;

 }

}
