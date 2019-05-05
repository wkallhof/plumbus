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
        context.fillRect(-Math.floor(this.width / 2), -Math.floor(this.height / 2), this.width, this.height);

        if(this.borderColor){
            context.strokeStyle = this.borderColor;
            context.strokeRect(-Math.floor(this.width / 2), -Math.floor(this.height / 2), this.width, this.height);
        }
    }
}