import { Scene } from "../engine/scene";
import { Text } from "../engine/game-objects/text";
import plumbus from "./plumbus.png";
import song from "./song.mp3";
import wet from "./wet.mp3";
import { ImageObject } from "../engine/game-objects/image";
import { GameObject } from "../engine/game-objects/game-object";

export class Scene1 extends Scene{

    private _user!: ImageObject;
    private _text!: Text;

    private _plumbuses!: GameObject[];

    private _songBuffer! : AudioBuffer;
    private _wetBuffer! : AudioBuffer;

    private _songInstance! : AudioBufferSourceNode;

    constructor(){
        super("Scene1");
    }

    public preload(){
        this.loadAudio(song).then((buffer) => this._songBuffer = buffer);
        this.loadAudio(wet).then((buffer) => this._wetBuffer = buffer);
    }

    public async create(){
        const worldWidth = 3200;
        const worldHeight = 1000;

        this.addRectangle(0, 0, worldWidth, worldHeight, "green", "brown");
        this.addRectangle(10, 10, 100, 100, "black");

        this._text = this.addText("Hello Plumbus", 30, 30, "white");
        this._text.rotationCenterXOffset = 100;

        this._user = this.addImage(plumbus, 50, 50, 200);

        this.camera.startFollow(this._user);
        this.camera.setBounds(0, 0, worldWidth, worldHeight);

        this.drawPlumbuses();

        this.keyboard.P.on("keyup", () => {
            this._songInstance = this.playAudio(this._songBuffer);
        });

        this.keyboard.L.on("keyup", () => {
            this.stopAudio(this._songInstance);
        })

        this.keyboard.I.on("keyup", () => {
            this.playAudio(this._wetBuffer);
        })
    }

    private drawPlumbuses() {
        var plumbusCount = 100;
        this._plumbuses = [];

        for(let i = 0; i < plumbusCount; i++){
            let randX = Math.floor(Math.random() * this.game.width) + 1;
            let randY = Math.floor(Math.random() * this.game.height) + 1;
            
            const image = this.addImage(plumbus, randX, randY, 100)
            image.rotation = Math.floor(Math.random() * 100);
            this._plumbuses.push(image);
        }
    }

    public update(){
        const speed : number = 5;

        if(this.keyboard.LEFT.isDown)
            this._user.x -= speed;
        
        if(this.keyboard.RIGHT.isDown)
            this._user.x += speed;

        if(this.keyboard.UP.isDown)
            this._user.y -= speed;

        if(this.keyboard.DOWN.isDown)
            this._user.y += speed;

        if(this.keyboard.A.isDown)
            this._user.rotation -= 0.05;

        if(this.keyboard.D.isDown)
            this._user.rotation += 0.05;

        if(this.keyboard.Z.isDown)
            this.camera.zoom -= 0.01;

        if(this.keyboard.X.isDown)
            this.camera.zoom += 0.01;

        this._text.rotation -= 0.01;

        this._plumbuses.forEach((object: GameObject) => {
            object.rotation += 0.01;
        });
    }
}