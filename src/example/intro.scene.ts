import { Scene } from "../engine/scene";
import { ImageObject } from "../engine/game-objects/image.object";
import plumbus from "./plumbus.png";
import { RectangleObject } from "../engine/game-objects/rectangle.object";

export class IntroScene extends Scene{

    private _logo! : ImageObject;
    private _mask! : RectangleObject;

    private _alpha : number = 1;
    private _timerSet : boolean = false;

    constructor(){
        super("IntroScene");
    }

    public preload(): Promise<void> {
        return Promise.resolve();
    }
    
    public create(): void {
        const centerX = this.game.width / 2;
        const centerY = this.game.height / 2;

        this._logo = this.addImage(plumbus, centerX - 200, centerY-200, 400);
        this._mask = this.addRectangle(0, 0, this.game.width, this.game.height, "black");
    }

    public update(): void {
        if(this._alpha > 0 && !this._timerSet){
            this._alpha -= 0.009;
            this._mask.fillColor = `rgba(0, 0, 0, ${this._alpha})`;
        }
        else if(!this._timerSet){
            setTimeout(() => {
                this.changeScene("MenuScene");
            }, 2000);
            this._timerSet = true;
        }
    }

}