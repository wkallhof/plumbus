import { Scene } from "../engine/scene";
import plumbus from "./plumbus.png";
import song from "./song.mp3";
import wet from "./wet.mp3";
import { ImageObject } from "../engine/game-objects/image.object";
import { GameObject } from "../engine/game-objects/game-object";
import { TextObject } from "../engine/game-objects/text.object";

export class Scene1 extends Scene{

    private _user!: ImageObject;
    private _text!: TextObject;

    private _plumbuses!: GameObject[];

    private _songBuffer! : AudioBuffer;
    private _wetBuffer! : AudioBuffer;

    private _songInstance? : AudioBufferSourceNode;

    constructor(){
        super("Scene1");

        this._plumbuses = [];
    }

    public async preload(){
        this._songBuffer = await this.loadAudio(song);
        this._wetBuffer = await this.loadAudio(wet);
    }

    public async create(){
        const worldWidth = 3200;
        const worldHeight = 1000;

        this.addRectangle(0, 0, worldWidth, worldHeight, "green", "brown");

        this._text = this.addText("Hello Plumbus", 100, 100, "white", 20);

        this.drawPlumbuses();

        this._user = this.addImage(plumbus, 50, 50, 200);

        let gun = this.addRectangle(400, 120, 80, 20, "black");
        gun.rotation = -0.3;

        let gun2 = this.addRectangle(10, 10, 20, 30, "pink");
        gun.addChild(gun2);

        this._user.addChild(gun);

        this.camera.startFollow(this._user);
        this.camera.setBounds(0, 0, worldWidth, worldHeight);

        this.keyboard.P.on("keyup", () => {
            this._songInstance = this.playAudio(this._songBuffer);
        });

        this.keyboard.L.on("keyup", () => {
            if(!this._songInstance)
                return;

            this.stopAudio(this._songInstance);
        })

        this.keyboard.I.on("keyup", () => {
            this.changeScene("MenuScene");
            //this.playAudio(this._wetBuffer);
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

        //this._text.rotation -= 0.01;

        this._plumbuses.forEach((object: GameObject) => {
            object.rotation += 0.01;
        });
    }
}