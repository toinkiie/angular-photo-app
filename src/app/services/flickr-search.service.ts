import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FlickrServiceAbstract } from './flickr-service.abstract';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from '../models/search-result';
import { SearchResultPhoto } from '../models/search-result-photo';

@Injectable()
export class FlickrSearchService extends FlickrServiceAbstract {

  constructor(private http: Http) {
    super();
  }

  searchPhoto(text: string, page: string = '1'): Observable<SearchResult> {
    const search = this.makeSearchParams(text, page);
    return this.http.get(this.apiRoot, {search}).map(response => this.handleResponse(response.json()));
  }

  loadMore(text: string, page: string) {
    return this.searchPhoto(text, page);
  }

  handleResponse(response: {photos}): SearchResult {
    const result = response.photos;

    const photos: SearchResultPhoto[] = result.photo.map(photo => this.transformPhoto(photo));

    const searchResult = new SearchResult(
      result.page,
      result.pages,
      result.perpage,
      result.total,
      photos
    );

    return searchResult;
  }

  transformPhoto(photo) {
    return new SearchResultPhoto(
      photo.id,
      photo.title,
      photo.url_m,
      photo.height_m,
      photo.ownername,
      photo.views
    );
  }

  makeSearchParams(text, page: string): URLSearchParams {
    const search = this.initFlickrParams();
    search.set('method', 'flickr.photos.search');
    search.set('per_page', '20');
    search.set('extras', 'url_m, owner_name, views');
    search.set('sort', 'relevance');
    search.set('page', page);
    search.set('text', text);

    return search;
  }
}
