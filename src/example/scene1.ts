import { Scene } from "../engine/scene";
import { Rectangle } from "../engine/game-objects/rectangle";
import { Text } from "../engine/game-objects/text";

export class Scene1 extends Scene{

    private _user!: Rectangle;
    private _text!: Text;

    constructor(){
        super("Scene1");
    }

    public create(){
        this.createTiledBackground();
        this._user = this.addRectangle(900, 20, 100, 100, "red", "black");

        this.addRectangle(10, 10, 100, 100, "black");

        this._text = this.addText("Hello Plumbus", 30, 30, "white");
        this._text.rotationCenterXOffset = 100;
    }

    public createTiledBackground(){

        const worldSize = 100;
        const tileSize = 32;

        for(let x = 0; x < worldSize; x++){
            for(let y = 0; y < worldSize; y++){
                this.addRectangle(x * tileSize, y * tileSize, tileSize, tileSize, "green", "brown");
            }
        }
    }

    public update(){
        const speed : number = 5;

        if(this.keyboard.LEFT.isDown)
            this.camera.x -= speed;
        
        if(this.keyboard.RIGHT.isDown)
            this.camera.x += speed;

        if(this.keyboard.UP.isDown)
            this.camera.y -= speed;

        if(this.keyboard.DOWN.isDown)
            this.camera.y += speed;

        if(this.keyboard.A.isDown)
            this._user.rotation -= 0.05;

        if(this.keyboard.D.isDown)
            this._user.rotation += 0.05;

        if(this.keyboard.W.isDown)
            this._user.width--;

        if(this.keyboard.S.isDown)
            this._user.width++;

        if(this.keyboard.Z.isDown)
            this.camera.zoom -= 0.01;

        if(this.keyboard.X.isDown)
            this.camera.zoom += 0.01;

        this._text.rotation -= 0.01;

    }
}