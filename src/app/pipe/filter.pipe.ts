import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  heure : any;
  horloge= () => {
    var t = new Date().toLocaleTimeString()
    this.heure = t;
    setTimeout(this.horloge, 1000);
  }

  transform(value: any, args: any): any {
    if(!value) return null;
    if(!args) return value;
    return value.filter(data => {
      return new Date(this.formatDate(data.date)) >= args.date1 && new Date(this.formatDate(data.date)) <=  args.date2
    })
  }

  formatDate(value: any): string {
    let valueArr = value.split("/");
    return `${valueArr[1]}/${valueArr[0]}/${valueArr[2]}`
  }

}
