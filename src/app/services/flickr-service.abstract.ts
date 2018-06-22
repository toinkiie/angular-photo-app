import { Http, URLSearchParams } from '@angular/http';
import { apiKey, apiRoot } from '../config/flickr.config';

export class FlickrServiceAbstract {
    apiRoot = apiRoot;

    constructor() {}

    protected initFlickrParams(): URLSearchParams {
        const search = new URLSearchParams();
        search.set('api_key', apiKey);
        search.set('format', 'json');
        search.set('content_type', '1');
        search.set('nojsoncallback', '1');
        return search;
    }
}
