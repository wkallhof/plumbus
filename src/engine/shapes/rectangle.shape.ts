import { Point } from "../point";

export class Rectangle {

    protected _origin : Point;
    protected _width: number;
    protected _height: number;
    protected _rotation: number;
    protected _center!: Point;

    protected _p1!: Point;
    protected _p2!: Point;
    protected _p3!: Point;
    protected _p4!: Point;

    public get position() : Point { return this._origin; }
    public set position(value: Point) { this._origin = value; this.calculate();};

    public get x(): number { return this._origin.x; };
    public set x(value: number) { this._origin = new Point(value, this._origin.y); this.calculate();}

    public get y(): number { return this._origin.y; };
    public set y(value: number) { this._origin = new Point(this._origin.x, value); this.calculate();}

    public get width() : number { return this._width; }
    public set width(value: number) { this._width = value; this.calculate();};

    public get height(): number { return this._height; }
    public set height(value: number) { this._height = value; this.calculate();}

    public get rotation(): number { return this._rotation; }
    public set rotation(value: number) { this._rotation = value; this.calculate();}

    public get center(): Point { return this._center; }
    public get points(): Point[] { return [this._p1, this._p2, this._p3, this._p4];}

    constructor(x: number, y: number, width: number, height: number){
        this._origin = new Point(x, y);
        this._width = width;
        this._height = height;
        this._rotation = 0;

        this.calculate();
    }

    protected calculate(){
        this._center = new Point(this._origin.x + (this._width / 2), this._origin.y + (this._height / 2));

        this._p1 = this.getCornerPointPosition(this._origin, this._center, this._rotation);
        this._p2 = this.getCornerPointPosition(new Point(this._origin.x + this._width, this._origin.y), this._center, this._rotation);
        this._p3 = this.getCornerPointPosition(new Point(this._origin.x + this._width, this._origin.y + this._height), this._center, this._rotation);
        this._p4 = this.getCornerPointPosition(new Point(this._origin.x, this._origin.y + this._height), this._center, this._rotation);
    }

    private getCornerPointPosition(cornerPoint: Point, centerPoint: Point, rotation: number) : Point{
        const tempX = cornerPoint.x - centerPoint.x;
        const tempY = cornerPoint.y - centerPoint.y;

        // now apply rotation
        const rotatedX = tempX*Math.cos(rotation) - tempY*Math.sin(rotation);
        const rotatedY = tempX*Math.sin(rotation) + tempY*Math.cos(rotation);

        // translate back
        return new Point(rotatedX + centerPoint.x, rotatedY + centerPoint.y);
    }
}