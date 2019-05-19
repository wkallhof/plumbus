import { GameObject } from "./game-object";

export class RectangleObject extends GameObject{

    public fillColor: string;
    public borderColor?: string;

    constructor(x:number, y:number, width:number, height:number, fillColor?:string, borderColor?:string){
        super(x, y, width, height);
        
        this.fillColor = fillColor || "white"; 
        this.borderColor = borderColor;
    }

    public draw(context : CanvasRenderingContext2D){
        context.fillStyle = this.fillColor;
        context.fillRect(this.x, this.y, this.width, this.height);

        if(this.borderColor){
            context.strokeStyle = this.borderColor;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}