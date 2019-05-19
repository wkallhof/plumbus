import { GameObject } from "./game-object";

export class ImageObject extends GameObject{
    public source: string
    public image: HTMLImageElement;

    constructor(source: string, x: number, y:number, width?: number){
        super(x, y, 0, 0);

        this.source = source;
        this.image = new Image();
        this.image.src = source;
        this.image.onload = () => {
            this.width = width || this.image.width;
            this.height = this.width * (this.image.naturalHeight / this.image.naturalWidth);
        }
    }

    public draw(context : CanvasRenderingContext2D){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}