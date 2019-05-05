import {EventEmitter} from "eventemitter3"

export class KeyboardKey extends EventEmitter{
    public keyCode : number;

    public isUp: boolean = true;
    public isDown: boolean = false;

    constructor(keyCode: number){
        super();
        this.keyCode = keyCode;
    }

    public keyUp(){
        this.emit("keyup");
        this.isUp = true;
        this.isDown = false;
    }

    public keyDown(){
        this.emit("keydown");
        this.isUp = false;
        this.isDown = true;
    }

    public unbind(){
        this.removeAllListeners();
    }
}