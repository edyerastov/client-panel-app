import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'UAH') {
      value *= 27;
      value += ' ' + 'UAH';
    }
    return value;
  }

}
