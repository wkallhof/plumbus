export class EventEmitter{
    private _bindings : { [event: string]: ((data: any) => void)[]};

    constructor(){
        this._bindings = {};
    }

    public on(event: string, callback: () => void){
        if(!this._bindings[event])
            this._bindings[event] = [];

        this._bindings[event].push(callback);
    }

    public emit(event: string, data?: any){
        if(!this._bindings[event])
            return;
            
        this._bindings[event].forEach((callback) => {
            callback(data);
        })
    }

    public clearListeners(){
        this._bindings = {};
    }

}