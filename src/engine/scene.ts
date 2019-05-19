import { Game } from "./game";
import { GameObject } from "./game-objects/game-object";
import { KeyboardInputManager } from "./input/keyboard-input-manager";
import { Camera } from "./camera";
import { ImageObject } from "./game-objects/image.object";
import { AudioPlayer } from "./audio-player";
import { Tween } from "./tween";
import { RectangleObject } from "./game-objects/rectangle.object";
import { TextObject } from "./game-objects/text.object";

export abstract class Scene{

    public name: string;
    public game!: Game;
    public keyboard!: KeyboardInputManager;
    public camera!: Camera
    public gameObjects: GameObject[];
    public audio!: AudioPlayer;
    public tweens: Tween[];

    constructor(name: string){
        this.name = name;
        this.gameObjects = [];
        this.tweens = [];
    }

    public addGameObject(object: GameObject){
        this.gameObjects.push(object);
        return object;
    }

    public addRectangle(x: number, y: number, width: number, height: number, fillColor: string, borderColor?: string){
        let rectangle = new RectangleObject(x, y, width, height, fillColor, borderColor);
        this.gameObjects.push(rectangle);
        return rectangle;
    }

    public addText(text: string, x: number, y: number, color?: string, fontSize?: number, font?: string){
        let textObject = new TextObject(this.game.displayContext, text, x, y, color, fontSize, font);
        this.gameObjects.push(textObject);
        return textObject;
    }

    public addImage(source: string, x: number, y:number, width?: number){
        let imageObject = new ImageObject(source, x, y, width);
        this.gameObjects.push(imageObject);
        return imageObject;
    }

    public async loadAudio(filepath: string) {
        return await this.audio.loadAudio(filepath);
    }

    public playAudio(source: AudioBuffer){
        return this.audio.playAudio(source);
    }

    public stopAudio(source: AudioBufferSourceNode){
        return this.audio.stopAudio(source);
    }

    public addTween(target: GameObject, props: {}, duration: number, easing : (count: number, startValue: number, delta: number, duration: number) => number, loop? : boolean){
        const tween = new Tween(target, props, duration, easing, loop);
        this.tweens.push(tween);
        return tween;
    }

    public abstract async preload(): Promise<void>;

    public abstract create(): void;

    public abstract update(): void;
}