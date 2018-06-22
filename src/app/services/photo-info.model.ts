
export class PhotoInfo {
    constructor(
        public id: number,
        public secret: string,
        public server: string,
        public farm: string,
        public dateuploaded: number,
        public originalformat: string,
        public dates: {posted: number, taken: string},
        public title: string,
        public description: string,
        public views: number,
        public tags: string[],
        public ownername: string
    ) {
    }
}