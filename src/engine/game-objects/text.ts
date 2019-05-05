import { GameObject } from "./game-object";
import { Game } from "../game";

export class Text extends GameObject{
    public text: string;
    public color: string;
    public fontSize: number;
    public font: string;

    constructor(text: string, x: number, y: number, color?: string, fontSize?: number, font?: string){
        super(x, y);

        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color || "black";
        this.fontSize = fontSize || 12;
        this.font = font || "Arial";
    }

    public draw(context: CanvasRenderingContext2D){
        this.height = context.measureText("M").width;
        this.width = context.measureText(this.text).width;

        context.fillStyle = this.color;
        context.font = `${this.fontSize}px ${this.font}`;
        context.fillText(this.text, -Math.floor(this.width / 2), -Math.floor(this.height / 2));
    }
}