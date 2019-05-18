import { GameObject } from "./game-objects/game-object";
import { EventEmitter } from "./event-emitter";

export class Tween extends EventEmitter{
    public target : GameObject;
    public props : any;
    public duration : number;
    public count: number = 0;
    public running: boolean = false;
    public loop: boolean = false;

    private _initialProps: any = {};

    private easing: (count: number, startValue: number, delta: number, duration: number) => number;

    constructor(target: GameObject, props: any, duration: number, easing : (count: number, startValue: number, delta: number, duration: number) => number, loop : boolean = false)
    {
        super();
        this.target = target;
        this.props = props;
        this.duration = duration;
        this.easing = easing;
        this.loop = loop;
    }
    
    public update(){
        if(!this.running)
            return;

        this.count++;

        if(this.count > this.duration){
            this.running = false;
            this.emit("finish");
            this.setProps(this.target, this.props);

            if(this.loop){
                this.setProps(this.target, this._initialProps);
                this.start();
            }
                
            return;
        }

        for(var key in this.props){
            const initialValue = this._initialProps[key];
            const endValue = this.props[key];
            this.setProperty(key, this.easing(this.count, initialValue, endValue - initialValue, this.duration));
        }

        this.emit("update");
    }

    public start(){
        // copy the initial target properties that we will be changing
        for(var key in this.props){
            (<any>this._initialProps)[key] = this.getProperty(key);
        }

        this.running = true;
        this.count = 0;
    }

    public static quadEaseIn(count: number, startValue: number, delta: number, duration: number){
        return delta*(count/=duration)*count*count*count + startValue;
    }

    public static quadEaseOut(count: number, startValue: number, delta: number, duration: number){
        return -delta * ((count=count/duration-1)*count*count*count - 1) + startValue;
    }

    public static quadEaseInOut(count: number, startValue: number, delta: number, duration: number){
        return ((count/=duration/2) < 1)
            ? delta/2*count*count*count*count + startValue
            : -delta/2 * ((count-=2)*count*count*count - 2) + startValue;
    }

    private getProperty(propertyKey: string) : number{
        return (<any>this.target)[propertyKey];
    }

    private setProperty(propertyKey: string, value: number) : void{
        (<any>this.target)[propertyKey] = value;
    }

    private setProps(target:any, props:any){
        for(var key in props){
            (<any>target)[key] = (<any>props)[key];
        }
    }
}