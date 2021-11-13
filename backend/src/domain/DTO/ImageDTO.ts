export class ImageDTO {
    _id: number;
    src: string;
    alt?: string;

    constructor (id: number, src: string, alt?: string) {
      this._id = id
      this.src = src
      this.alt = alt
    }
}
