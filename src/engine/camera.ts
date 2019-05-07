import { Game } from "./game";
import { GameObject } from "./game-objects/game-object";
import { Rectangle } from "./game-objects/rectangle";

export class Camera{
    public x: number = 0;
    public y: number = 0;
    public width: number;
    public height: number;
    public zoom: number = 1;
    public game: Game;

    public bounds: Rectangle;

    public followTarget?: GameObject;

    constructor(game: Game, x: number, y: number, width: number, height: number){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.bounds = new Rectangle(this.x, this.y, this.width, this.height);
    }

    public render(){
        this.game.displayContext.setTransform(1,0,0,1,0,0);
            
        this.x = this.x < 0 ? 0: this.x;
        this.y = this.y < 0 ? 0: this.y;

        if(this.zoom < 1)
            this.zoom = 1;

        this.adjustForTarget();
        this.adjustForBounds();

        
        //

        //this.game.displayContext.scale(this.zoom, this.zoom);
        this.game.displayContext.setTransform(this.zoom, 0, 0, this.zoom, this.width / 2, this.height / 2);
        this.game.displayContext.translate(-this.x - (this.width  / 2), -this.y -(this.height / 2));
        
        

        this.drawGameObjects();
        this.game.displayContext.translate(this.x, this.y);

        this.game.displayContext.setTransform(1,0,0,1,0,0);
    }

    private adjustForTarget(){
        if(!this.followTarget)
            return;

        const cameraCenterXOffset = (this.width / 2);
        const cameraCenterYOffset = (this.height / 2)

        const targetCenterX = this.followTarget.x + (this.followTarget.width / 2);
        const targetCenterY = this.followTarget.y + (this.followTarget.height / 2);

        this.x = targetCenterX - cameraCenterXOffset;
        this.y = targetCenterY - cameraCenterYOffset;
    }

    private adjustForBounds(){
        this.x = Math.max(this.x, this.bounds.x);
        this.y = Math.max(this.y, this.bounds.y);

        const maxX = (this.bounds.x + this.bounds.width) - this.width;
        const maxY = (this.bounds.y + this.bounds.height) - this.height;

        this.x = Math.min(this.x, maxX);
        this.y = Math.min(this.y, maxY);
    }

    public startFollow(object: GameObject){
        this.followTarget = object;
    }

    public stopFollowing(){
        this.followTarget = undefined;
    }

    public setBounds(x: number, y: number, width: number, height: number){
        this.bounds.x = x;
        this.bounds.y = y;
        this.bounds.width = width;
        this.bounds.height = height;
    }

    private drawGameObjects(){
        this.game.currentScene.gameObjects.forEach((object: GameObject, index:number) => 
        {
            if((object.x + object.width) <= this.x 
            || (object.y + object.height) <= this.y
            || (object.x > this.x + (this.width))
            || (object.y > this.y + (this.height)))
                return;

            object.update(this.game);
        });
    }
}