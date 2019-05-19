import { Scene } from "./scene";
import { FpsMonitor } from "./fps-monitor";
import { KeyboardInputManager } from "./input/keyboard-input-manager";
import { Camera } from "./camera";
import { AudioPlayer } from "./audio-player";

export class Game{

    public width: number;
    public height: number;

    public displayCanvasElement: HTMLCanvasElement;
    public displayContext: CanvasRenderingContext2D;

    public currentScene: Scene;
    public scenes: {new(): Scene}[];
    
    private _fpsMonitor : FpsMonitor;

    private _keyboard : KeyboardInputManager;

    constructor(width: number, height: number, scenes: {new(): Scene}[]){
        this.width = width;
        this.height = height;
        this.scenes = scenes;
        this.currentScene = new scenes[0];

        this.displayCanvasElement = document.createElement("canvas");
        document.body.appendChild(this.displayCanvasElement);
        this.displayCanvasElement.width = width;
        this.displayCanvasElement.height = height;
        this.displayContext = this.displayCanvasElement.getContext("2d") as CanvasRenderingContext2D;

        this._fpsMonitor = new FpsMonitor(this.displayContext);

        this._keyboard = new KeyboardInputManager();

        this.currentScene.game = this;
        this.currentScene.camera = new Camera(this, 0, 0, this.width, this.height);
        this.currentScene.keyboard = this._keyboard;
        this.currentScene.audio = new AudioPlayer();
        
        this.currentScene.preload().then(() => {
            this.currentScene.create();
            window.requestAnimationFrame(this.update.bind(this));
        })
    }

    private update(){
        if(!this.currentScene)
            return;

        this._fpsMonitor.begin();

        this.displayContext.clearRect(0, 0, this.width, this.height);
        this.displayContext.fillStyle = "black";
        this.displayContext.fillRect(0, 0, this.width, this.height);
        this.currentScene.update();
        this.currentScene.tweens.forEach((tween) => tween.update());
        this.currentScene.camera.render();

        this._fpsMonitor.end();

        window.requestAnimationFrame(this.update.bind(this));
    }
}