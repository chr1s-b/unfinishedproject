export class image {
    img: HTMLImageElement;
    constructor(uri: string) {
        this.img = new Image();
        this.img.src = uri;
        this.img.style.display = "none";
        this.img.style.position = "absolute";
    }

    show() {
        this.img.style.display = "block";
    }
}