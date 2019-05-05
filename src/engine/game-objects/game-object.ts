import { Game } from "../game";

export class GameObject{
    public x : number;
    public y: number;
    public width: number = 0;
    public height: number = 0;

    public rotation: number = 0;

    public rotationCenterXOffset: number = 0;
    public rotationCenterYOffset: number = 0;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    public update(game: Game){
        const context = game.displayContext;
        
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);

        const translateX = this.x + centerX + Math.floor(this.rotationCenterXOffset);
        const translateY = this.y + centerY  + Math.floor(this.rotationCenterYOffset)

        context.save();
        context.translate(translateX, translateY);
        context.rotate(this.rotation);

        this.draw(context);
        
        context.restore();
    }

    public draw(context : CanvasRenderingContext2D){}
}