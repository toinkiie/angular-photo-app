import { SearchResultPhoto } from './search-result-photo';

export class SearchResult {
    constructor(
        public page: number,
        public pages: number,
        public perpage: number,
        public total: number,
        public photos: SearchResultPhoto[]
    ) {}
}
