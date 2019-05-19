import { GameObject } from "./game-object";
import { Game } from "../game";

export class Rectangle extends GameObject{

    public fillColor: string;
    public borderColor?: string;

    constructor(x:number, y:number, width:number, height:number, fillColor?:string, borderColor?:string){
        super(x, y);
        this.fillColor = fillColor || "white";
        this.width = width;
        this.height = height;      
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