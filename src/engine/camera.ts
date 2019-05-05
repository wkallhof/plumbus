import { Game } from "./game";
import { GameObject } from "./game-objects/game-object";

export class Camera{
    public x: number = 0;
    public y: number = 0;
    public width: number;
    public height: number;
    public zoom: number = 1;
    public game: Game;

    constructor(game: Game, x: number, y: number, width: number, height: number){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public render(){
        this.game.displayContext.setTransform(1,0,0,1,0,0);
            
        this.x = this.x < 0 ? 0: this.x;
        this.y = this.y < 0 ? 0: this.y;

        if(this.zoom < 1)
            this.zoom = 1;

        this.game.displayContext.scale(this.zoom, this.zoom);

        this.game.displayContext.translate(-this.x, -this.y);

        this.drawGameObjects();
        this.game.displayContext.translate(this.x, this.y);
    }

    private drawGameObjects(){
        this.game.currentScene.gameObjects.forEach((object: GameObject, index:number) => 
        {
            // const zoomX = object.x * this.zoom;
            // const zoomY = object.y * this.zoom;
            // const zoomWidth = object.width * this.zoom;
            // const zoomHeight = object.height * this.zoom;
            // ensure we are drawing inside the bounds of the screen
            //TODO: Change to camera logic when implemented
            if((object.x + object.width) <= this.x 
            || (object.y + object.height) <= this.y
            || (object.x > this.x + (this.width))
            || (object.y > this.y + (this.height))
            )
                return;

            object.update(this.game);
        });
    }
}