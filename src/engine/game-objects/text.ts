import { GameObject } from "./game-object";
import { Game } from "../game";

export class Text extends GameObject{
    public text: string;
    public color: string;
    public fontSize: number;
    public font: string;

    constructor(context: CanvasRenderingContext2D, text: string, x: number, y: number, color?: string, fontSize?: number, font?: string){
        super(x, y);

        this.text = text;
        this.color = color || "black";
        this.fontSize = fontSize || 12;
        this.font = font || "Arial";

        context.font = `${this.fontSize}px ${this.font}`;
        this.height = context.measureText("M").width;
        this.width = context.measureText(this.text).width;
    }

    public draw(context: CanvasRenderingContext2D){
        context.fillStyle = this.color;
        context.font = `${this.fontSize}px ${this.font}`;
        context.fillText(this.text, this.x, this.y + this.height);
    }
}