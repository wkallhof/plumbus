import { Game } from "../game";

export abstract class GameObject{
    public x : number;
    public y: number;
    public width: number = 0;
    public height: number = 0;
    public rotation: number = 0;

    public children: GameObject[];
    public parent?: GameObject;

    public addChild(child: GameObject): void{
        if(child.parent)
            return;

        child.parent = this;
        this.children.push(child);
    }

    public get boundingWidth() : number { 
        return Math.abs(Math.sin(this.rotation)* this.height)  + Math.abs(Math.cos(this.rotation)* this.width) ;
        
    }
    public get boundingHeight() : number { 
        return Math.abs(Math.sin(this.rotation)* this.width)  + Math.abs(Math.cos(this.rotation)* this.height) ;
    }

    public get boundingX(): number {
        return  this.x - ((this.boundingWidth / 2)-(this.width / 2));
    }

    public get boundingY(): number {
        return this.y - ((this.boundingHeight / 2)-(this.height / 2));
    }

    public get currentAngle(): number {
        return this.rotation * 180 / Math.PI;
    }

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.children = [];
    }

    public update(game: Game){
        const context = game.displayContext;

        // save the context so we can restore back after transforms
        context.save();
        
        // apply rotation
        this.applyRotationTransform(context);

        // draw object
        this.draw(context);

        // draw children
        if(this.children.length > 0){
            context.translate(this.x, this.y);
            this.children.forEach((child: GameObject) => child.update(game));
            context.translate(-this.x, -this.y);
        }

        //this.renderOutline(context);
        context.restore();
        //this.renderBoundingBox(context);
    }

    /**
     * This method applies the rotational transform to the rendering context
     * by translating to the center of the object, applying a rotation, then translating
     * back to origin.
     * 
     * @param context Rendering Context
     */
    private applyRotationTransform(context : CanvasRenderingContext2D) : void {
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);
        let translateX = this.x + centerX;
        let translateY = this.y + centerY;

        context.translate(translateX, translateY);
        context.rotate(this.rotation);
        context.translate(-translateX, -translateY);
    }

    /**
     * Displays a white outline around the object
     * @param context Rendering Context
     */
    private renderOutline(context : CanvasRenderingContext2D){
        context.strokeStyle = "white";
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Displays a white outline representing the objects
     * bounding box
     * @param context Rendering Context
     */
    private renderBoundingBox(context : CanvasRenderingContext2D){
        context.strokeStyle = "white";
        context.strokeRect(this.boundingX , this.boundingY, this.boundingWidth, this.boundingHeight);
    }

    /**
     * Main draw method that is called when an object should be
     * rendered on the canvas. Classes implementing GameObject
     * supply their own rendering logic
     * @param context Rendering Context
     */
    public abstract draw(context : CanvasRenderingContext2D) : void;
}