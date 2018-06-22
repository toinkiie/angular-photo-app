import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripTags'
})
export class StripTagsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return  value ? String(value).replace(/<[^>]+>/gm, '') : '';
  }

}
