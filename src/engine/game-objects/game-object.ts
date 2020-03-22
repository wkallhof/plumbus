import { Game } from "../game";
import { Rectangle } from "../shapes/rectangle.shape";
import { Transform } from "./transform";
import { Point } from "../point";

export abstract class GameObject extends Rectangle{

    public children: GameObject[];
    public parent?: GameObject;
    public transforms: Transform[];

    private _boundingRectangle!: Rectangle;
    private _worldRectangle!: Rectangle;

    public get boundingRectangle() : Rectangle { return this._boundingRectangle; }

    constructor(x: number, y: number, width: number, height: number){
        super(x, y, width, height);
        this.children = [];
        this.transforms = [];

        this._worldRectangle = this._boundingRectangle = this;
    }

    protected calculate(){
        super.calculate();

        if(this.transforms && this.transforms.length > 0){
            let newRectangle : Rectangle = this;
            this.transforms.forEach((transform) => {
                newRectangle = newRectangle.transform(transform);
            });
    
            this._worldRectangle = newRectangle;
        }

        if(this._worldRectangle){
            const worldPoints = this._worldRectangle.points;
            // set bounding rect
            let minX = Math.min(worldPoints[0].x, worldPoints[1].x, worldPoints[2].x, worldPoints[3].x);
            let minY = Math.min(worldPoints[0].y, worldPoints[1].y, worldPoints[2].y, worldPoints[3].y);
            let maxX = Math.max(worldPoints[0].x, worldPoints[1].x, worldPoints[2].x, worldPoints[3].x);
            let maxY = Math.max(worldPoints[0].y, worldPoints[1].y, worldPoints[2].y, worldPoints[3].y);
    
            let boundingBox = new Rectangle(minX, minY, maxX - minX, maxY - minY);
            this._boundingRectangle = boundingBox;
        }


        // if(this.children && this.children.length > 0){
        //     minX = Math.min(...this.children.map((object) => object.boundingRectangle.x), boundingBox.x);
        //     minY = Math.min(...this.children.map((object) => object.boundingRectangle.y), boundingBox.y);
        //     maxX = Math.max(...this.children.map((object) => object.boundingRectangle.x + object.boundingRectangle.width), boundingBox.x + boundingBox.width);
        //     maxY = Math.max(...this.children.map((object) => object.boundingRectangle.y + object.boundingRectangle.height), boundingBox.y + boundingBox.height);

        //     boundingBox = new Rectangle(minX, minY, maxX - minX, maxY - minY);
        // }

        

        // if(this.parent)
        //     this.parent.calculate();

        if(this.children)
            this.children.forEach((child) => {
                child.transforms = [...this.transforms,new Transform(this.position, this.center, this.rotation)];
                child.calculate();
            })
    }

    public addChild(child: GameObject): void{
        if(child.parent)
            return;

        child.parent = this;
        child.transforms = [...this.transforms,new Transform(this.position, this.center, this.rotation)];

        this.children.push(child);
        this.calculate();
    }

    public update(game: Game){
        const context = game.displayContext;

        this.transforms.forEach((transform) => {
            this.applyRotationTransform(context, transform.center, transform.rotation);
            context.translate(transform.position.x, transform.position.y);
        });
        
        // apply rotation
        this.applyRotationTransform(context, this.center, this.rotation);

        // draw object
        this.draw(context);

        //this.renderOutline(context);

        this.applyRotationTransform(context, this.center, -this.rotation);

        this.transforms.reverse().forEach((transform) => {
            context.translate(-transform.position.x, -transform.position.y);
            this.applyRotationTransform(context, transform.center, -transform.rotation);
        });

        this.transforms.reverse();
        
        //this.renderBoundingBox(context);

        // if(this._worldRectangle)
        //     this.renderWorldBox(context);

        if(this.children.length > 0){
            this.children.forEach((child: GameObject) => child.update(game));
        }
    }

    /*
    *1. rotate
    *2. draw
    *3. translate x
    *  - 1. rotate
    *  - 2. draw
    *  - 3. -rotate
    * 4. - translate x
    * 5. -rotate

    /**
     * This method applies the rotational transform to the rendering context
     * by translating to the center of the object, applying a rotation, then translating
     * back to origin.
     * 
     * @param context Rendering Context
     */
    private applyRotationTransform(context : CanvasRenderingContext2D, center: Point, rotation:number) : void {
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);
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

    private renderWorldBox(context : CanvasRenderingContext2D){
        context.strokeStyle = "red";
        this._worldRectangle.points.forEach((point) => {
            context.strokeRect(point.x, point.y, 3, 3);
        });
        //context.strokeRect(this._worldRectangle.x, this._worldRectangle.y, this._worldRectangle.width, this._worldRectangle.height);
    }

    /**
     * Main draw method that is called when an object should be
     * rendered on the canvas. Classes implementing GameObject
     * supply their own rendering logic
     * @param context Rendering Context
     */
    public abstract draw(context : CanvasRenderingContext2D) : void;
}