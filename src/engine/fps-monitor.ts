export class FpsMonitor{
    private _context : CanvasRenderingContext2D;

    private _beginTime : number;
    private _previousTime : number;
    private _frames : number;
    private _currentFrameRate : number;

    constructor(context: CanvasRenderingContext2D){
        this._context = context;

        this._beginTime = performance.now();
        this._previousTime = this._beginTime;
        this._frames = 0;
        this._currentFrameRate = 0;
    }

    public begin(){
        this._beginTime = performance.now();
    }

    public end(){
        this._frames ++;
        const now = performance.now();

        this.updateDisplay(this._currentFrameRate.toString());

        if (now < this._previousTime + 1000)
            return;

        this._currentFrameRate = Math.round((this._frames * 1000) / (now - this._previousTime));
        this._previousTime = now;
        this._frames = 0;
    }

    private updateDisplay(value: string){
        this._context.fillStyle = "white";
        this._context.fillRect(0, 0, 35, 20);
        this._context.font = 'bold 12px Helvetica,Arial,sans-serif';
        this._context.fillStyle = "black";
        this._context.fillText(value, 10, 10);
    }
}