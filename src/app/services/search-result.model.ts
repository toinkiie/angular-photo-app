export class SearchResult {
    constructor(
        public page: number,
        public pages: number,
        public perPage: number,
        public total: number,
        public photo: {
            id: number,
            title: string,
            url_m: string,
            height_m: number,
            [key: string]: any
        }[]
    ) {}
}
