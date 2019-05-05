import { KeyboardKey } from "./keyboard-key";

export class KeyboardInputManager{
    private _keys : { [keyCode: number]: KeyboardKey; } = { };

    constructor(){
        this.A = this.initAndAddToLookup("A".charCodeAt(0));
        this.B = this.initAndAddToLookup("B".charCodeAt(0));
        this.C = this.initAndAddToLookup("C".charCodeAt(0));
        this.D = this.initAndAddToLookup("D".charCodeAt(0));
        this.E = this.initAndAddToLookup("E".charCodeAt(0));
        this.F = this.initAndAddToLookup("F".charCodeAt(0));
        this.G = this.initAndAddToLookup("G".charCodeAt(0));
        this.H = this.initAndAddToLookup("H".charCodeAt(0));
        this.I = this.initAndAddToLookup("I".charCodeAt(0));
        this.J = this.initAndAddToLookup("J".charCodeAt(0));
        this.K = this.initAndAddToLookup("K".charCodeAt(0));
        this.L = this.initAndAddToLookup("L".charCodeAt(0));
        this.M = this.initAndAddToLookup("M".charCodeAt(0));
        this.N = this.initAndAddToLookup("N".charCodeAt(0));
        this.O = this.initAndAddToLookup("O".charCodeAt(0));
        this.P = this.initAndAddToLookup("P".charCodeAt(0));
        this.Q = this.initAndAddToLookup("Q".charCodeAt(0));
        this.R = this.initAndAddToLookup("R".charCodeAt(0));
        this.S = this.initAndAddToLookup("S".charCodeAt(0));
        this.T = this.initAndAddToLookup("T".charCodeAt(0));
        this.U = this.initAndAddToLookup("U".charCodeAt(0));
        this.V = this.initAndAddToLookup("V".charCodeAt(0));
        this.W = this.initAndAddToLookup("W".charCodeAt(0));
        this.X = this.initAndAddToLookup("X".charCodeAt(0));
        this.Y = this.initAndAddToLookup("Y".charCodeAt(0));
        this.Z = this.initAndAddToLookup("Z".charCodeAt(0));

        this.SHIFT = this.initAndAddToLookup(16);
        this.SPACEBAR = this.initAndAddToLookup(32);
        this.ESCAPE = this.initAndAddToLookup(27);
        this.LEFT = this.initAndAddToLookup(37);
        this.UP = this.initAndAddToLookup(38);
        this.RIGHT = this.initAndAddToLookup(39);
        this.DOWN = this.initAndAddToLookup(40);

        document.addEventListener("keyup", this.handleKeyUp.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    public unbindKeys(){
        for(let key in this._keys){
            this._keys[key].unbind();
        }
    }

    private initAndAddToLookup(keyCode: number){
        let key = new KeyboardKey(keyCode);
        this._keys[key.keyCode] = key;
        return key;
    }

    private handleKeyUp(event: KeyboardEvent){
        let key = this._keys[event.keyCode];
        if(key)
            key.keyUp();
    }

    private handleKeyDown(event: KeyboardEvent){
        let key = this._keys[event.keyCode];
        if(key)
            key.keyDown();
    }

    public A : KeyboardKey;
    public B : KeyboardKey;
    public C : KeyboardKey;
    public D : KeyboardKey;
    public E : KeyboardKey;
    public F : KeyboardKey;
    public G : KeyboardKey;
    public H : KeyboardKey;
    public I : KeyboardKey;
    public J : KeyboardKey;
    public K : KeyboardKey;
    public L : KeyboardKey;
    public M : KeyboardKey;
    public N : KeyboardKey;
    public O : KeyboardKey;
    public P : KeyboardKey;
    public Q : KeyboardKey;
    public R : KeyboardKey;
    public S : KeyboardKey;
    public T : KeyboardKey;
    public U : KeyboardKey;
    public V : KeyboardKey;
    public W : KeyboardKey;
    public X : KeyboardKey;
    public Y : KeyboardKey;
    public Z : KeyboardKey;

    public SHIFT: KeyboardKey;
    public SPACEBAR: KeyboardKey;
    public ESCAPE: KeyboardKey;
    public LEFT: KeyboardKey;
    public UP: KeyboardKey;
    public RIGHT: KeyboardKey;
    public DOWN: KeyboardKey;
}