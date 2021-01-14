export class image {
    img: HTMLImageElement;
    constructor(uri: string) {
        this.img = new Image();
        this.img.src = uri;
        this.img.style.position = "fixed";
        this.img.hidden = true;
        document.body.appendChild(this.img);
    }

    show(x: number, y: number, width: number = this.img.naturalWidth, height: number = this.img.naturalHeight) {
        this.img.style.left = x.toString()+"px";
        this.img.style.top = y.toString()+"px";
        this.img.style.height = height.toString()+"px";
        this.img.style.width = width.toString()+"px";
        this.img.hidden = false;
    }
}