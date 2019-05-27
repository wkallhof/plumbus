import { Point } from "../point";

export class Transform{
    public position: Point;
    public center: Point;
    public rotation: number;

    constructor(position: Point, center: Point, rotation:number){
        this.position = position;
        this.center = center;
        this.rotation = rotation;
    }
}