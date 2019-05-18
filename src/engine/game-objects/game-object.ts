import { Game } from "../game";

export class GameObject{
    public x : number;
    public y: number;
    public width: number = 0;
    public height: number = 0;

    public rotation: number = 0;

    public parent? : GameObject;

    public get worldX() : number { return this.parent ? this.parent.x + this.x : this.x };
    public get worldY() : number { return this.parent ? this.parent.y + this.y : this.y };

    public get currentWorldAngle() : number { return (this.parent ? this.parent.rotation + this.rotation : this.rotation) * 180 / Math.PI};
    public get currentWorldRotation() : number { return this.parent ? this.parent.rotation + this.rotation : this.rotation};

    public get boundingWidth() : number { 
        return Math.abs(Math.sin(this.currentWorldRotation)* this.height)  + Math.abs(Math.cos(this.currentWorldRotation)* this.width) ;
        
    }
    public get boundingHeight() : number { 
        return Math.abs(Math.sin(this.currentWorldRotation)* this.width)  + Math.abs(Math.cos(this.currentWorldRotation)* this.height) ;
    }

    public get boundingX(): number {
        return  this.worldX - ((this.boundingWidth / 2)-(this.width / 2));
    }

    public get boundingY(): number {
        return this.worldY - ((this.boundingHeight / 2)-(this.height / 2));
    }

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    public update(game: Game){
        const context = game.displayContext;
        
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);

        let translateX = this.x + centerX;
        let translateY = this.y + centerY;
        if(this.parent){
            translateX = this.parent.x + translateX;
            translateY = this.parent.y + translateY;
        }

        const rotation = this.parent ? this.parent.rotation + this.rotation : this.rotation;

        context.save();
        context.translate(translateX, translateY);
        context.rotate(rotation);

        this.draw(context);
        
        //draw outline
        //  context.strokeStyle = "white";
        //  context.strokeRect(-Math.floor(this.width / 2), -Math.floor(this.height / 2), this.width, this.height);

        context.restore();

        //draw bounding box
        //  context.strokeStyle = "white";
        //  context.strokeRect(this.boundingX , this.boundingY, this.boundingWidth, this.boundingHeight);
    }

    public draw(context : CanvasRenderingContext2D){}
}