import { Game } from "../game";
import { Rectangle } from "../shapes/rectangle.shape";

export abstract class GameObject extends Rectangle{

    public children: GameObject[];
    public parent?: GameObject;

    private _boundingRectangle!: Rectangle;

    public get boundingRectangle() : Rectangle { return this._boundingRectangle; }

    constructor(x: number, y: number, width: number, height: number){
        super(x, y, width, height);
        this.calculate();

        this.children = [];
    }

    protected calculate(){
        super.calculate();

        // set bounding rect
        let minX = Math.min(this._p1.x, this._p2.x, this._p3.x, this._p4.x);
        let minY = Math.min(this._p1.y, this._p2.y, this._p3.y, this._p4.y);
        let maxX = Math.max(this._p1.x, this._p2.x, this._p3.x, this._p4.x);
        let maxY = Math.max(this._p1.y, this._p2.y, this._p3.y, this._p4.y);

        this._boundingRectangle = new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }

    public addChild(child: GameObject): void{
        if(child.parent)
            return;

        child.parent = this;
        this.children.push(child);
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

        this.renderOutline(context);
        context.restore();
        this.renderBoundingBox(context);
    }

    /**
     * This method applies the rotational transform to the rendering context
     * by translating to the center of the object, applying a rotation, then translating
     * back to origin.
     * 
     * @param context Rendering Context
     */
    private applyRotationTransform(context : CanvasRenderingContext2D) : void {
        context.translate(this.center.x, this.center.y);
        context.rotate(this.rotation);
        context.translate(-this.center.x, -this.center.y);
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
        context.strokeRect(this.boundingRectangle.x , this.boundingRectangle.y, this.boundingRectangle.width, this.boundingRectangle.height);
    }

    /**
     * Main draw method that is called when an object should be
     * rendered on the canvas. Classes implementing GameObject
     * supply their own rendering logic
     * @param context Rendering Context
     */
    public abstract draw(context : CanvasRenderingContext2D) : void;
}