import { Scene } from "../engine/scene";
import plumbus from "./plumbus.png";
import song from "./song.mp3";
import wet from "./wet.mp3";
import { ImageObject } from "../engine/game-objects/image.object";
import { GameObject } from "../engine/game-objects/game-object";
import { Tween, Easing } from "../engine/tween";
import { RectangleObject } from "../engine/game-objects/rectangle.object";
import { TextObject } from "../engine/game-objects/text.object";

export class MenuScene extends Scene{

    private _menuItem1! : RectangleObject;
    private _menuItem2! : RectangleObject;

    private _menuItem1Tween!: Tween;
    private _menuItem2Tween!: Tween;
    private _songBuffer!: AudioBuffer;
    private _songInstance? : AudioBufferSourceNode;

    constructor(){
        super("MenuScene");
    }

    public async preload(){
        this._songBuffer = await this.loadAudio(song);
    }

    public async create(){
        const worldWidth = 800;
        const worldHeight = 600;

        this.addRectangle(0, 0, worldWidth, worldHeight, "black");

        this.createMenu();

        this.camera.setBounds(0, 0, worldWidth, worldHeight);

        this._songInstance = this.playAudio(this._songBuffer);

        this.keyboard.I.on("keyup", () => {
            this.changeScene("Scene1");
        })
    }

    private createMenu(){
        this._menuItem1 = this.addRectangle(-200, 10, 200, 50, "black");
        this._menuItem1.addChild(this.addText("Menu Item 1", 10, 10, "white", 30));

        this._menuItem2 = this.addRectangle(-200, 80, 200, 50, "black");
        this._menuItem2.addChild(this.addText("Menu Item 2", 10, 10, "white", 30));

        this._menuItem1Tween = this.addTween(this._menuItem1, {x : 300}, 180, Easing.quadOut);
        this._menuItem2Tween = this.addTween(this._menuItem2, {x : 300}, 180, Easing.quadOut);

        this._menuItem1Tween.start();

        this._menuItem1Tween.on("update", () => {
            if(!this._menuItem2Tween.running && this._menuItem1Tween.count > 40){
                this._menuItem2Tween.start();
            }
        });
    }

    public update(){}
}