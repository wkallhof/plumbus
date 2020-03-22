import { EventEmitter } from "../event-emitter";

export class MouseInputManager extends EventEmitter{

    private _canvasElement : HTMLCanvasElement;

    private _isDown : boolean;
    public get isDown() : boolean { return this._isDown; };

    constructor(canvasElement : HTMLCanvasElement){
        super();
        this._isDown = false;
        this._canvasElement = canvasElement;

        canvasElement.addEventListener(MouseEvent.MouseClick, this.onClick.bind(this));
        canvasElement.addEventListener(MouseEvent.MouseDown, this.onMouseDown.bind(this));
        canvasElement.addEventListener(MouseEvent.MouseUp, this.onMouseUp.bind(this));
        canvasElement.addEventListener(MouseEvent.MouseMove, this.onMouseMove.bind(this));
    }

    private onMouseDown(event: MouseEvent){
        this._isDown = true;
        this.emit(MouseEvent.MouseDown, event);
    }

    private onMouseUp(){
        this._isDown = false;
        this.emit(MouseEvent.MouseUp, event);
    }

    private onClick(event: MouseEvent){
        this.emit(MouseEvent.MouseClick, event);
    }

    private onMouseMove(){
        this.emit(MouseEvent.MouseMove, event);
    }
}

export class MouseEvent{
    public static MouseDown : string = "mousedown";
    public static MouseUp : string = "mouseup";
    public static MouseClick : string = "click";
    public static MouseMove : string = "mousemove";
}