import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(!value || !args) return value;

    if(args.length > 2) {
      console.error("attendu 2 argument, mais en a obtenu "+args.length);
      return value
    }

    if(args[0] > args[1]) {
      console.error("argument 1 superieur à l'argument 2");
      return value
    }

    if(args.length == 2 && args[0] <= args[1]) {
      return value.slice(args[0], args[1])
    }
  }

}
