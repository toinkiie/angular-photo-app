import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photoPath'
})
export class PhotoPathPipe implements PipeTransform {

  transform(photo: any): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;
  }

}
