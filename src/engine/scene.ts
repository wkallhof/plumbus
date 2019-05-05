import { Game } from "./game";
import { GameObject } from "./game-objects/game-object";
import { KeyboardInputManager } from "./input/keyboard-input-manager";
import { Rectangle } from "./game-objects/rectangle";
import { Text } from "./game-objects/text";
import { Camera } from "./camera";
import { ImageObject } from "./game-objects/image";

export class Scene{

    public name: string;
    public game!: Game;
    public keyboard!: KeyboardInputManager;
    public camera!: Camera
    public gameObjects: GameObject[];

    constructor(name: string){
        this.name = name;
        this.gameObjects = [];
    }

    public addGameObject(object: GameObject){
        this.gameObjects.push(object);
        return object;
    }

    public addRectangle(x: number, y: number, width: number, height: number, fillColor: string, borderColor?: string){
        let rectangle = new Rectangle(x, y, width, height, fillColor, borderColor);
        this.gameObjects.push(rectangle);
        return rectangle;
    }

    public addText(text: string, x: number, y: number, color?: string, fontSize?: number, font?: string){
        let textObject = new Text(text, x, y, color, fontSize, font);
        this.gameObjects.push(textObject);
        return textObject;
    }

    public addImage(source: string, x: number, y:number, width?: number){
        let imageObject = new ImageObject(source, x, y, width);
        this.gameObjects.push(imageObject);
        return imageObject;
    }

    public preload(){

    }

    public create(){

    }

    public update(){

    }


}