import { Game } from "../engine/game";
import { Scene1 } from "./scene1";
import { Scene2 } from "./scene2";
import { IntroScene } from "./intro.scene";

var game = new Game(800, 600, [IntroScene, Scene1, Scene2]);