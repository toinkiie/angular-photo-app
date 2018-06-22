import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { apiKey, apiRoot } from '../config/flickr.config';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';
import 'rxjs/add/operator/map';
import { PhotoInfo } from './photo-info.model';
import { FlickrServiceAbstract } from './flickr-service.abstract';

@Injectable()
export class FlickrService extends FlickrServiceAbstract {

  constructor(private http: Http) {
    super();
  }

  getInfo(id: string): Observable<PhotoInfo> {
    const search = this.initFlickrParams();
    search.set('method', 'flickr.photos.getInfo');
    search.set('photo_id', id);

    return this.http.get(apiRoot, {search}).map(res => this.makePhotoInfo(
      res.json().photo
    ));
  }

  makePhotoInfo(photo): PhotoInfo {

    const photo_id = photo.id;

    const dates = {
      posted: photo.dates.posted * 1000, // Epoch
      taken: photo.dates.taken
    };

    const tags = photo.tags.tag.map((tag) => tag.raw);

    const photoInfo = new PhotoInfo(
      photo_id,
      photo.secret,
      photo.server,
      photo.farm,
      photo.dateuploaded,
      photo.originalformat,
      dates,
      photo.title._content,
      photo.description._content,
      photo.views,
      tags,
      photo.owner.username
    );
    return photoInfo;
  }
}
