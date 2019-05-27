import { Game } from "../engine/game";
import { Scene1 } from "./scene1.scene";
import { MenuScene } from "./menu.scene";
import { IntroScene } from "./intro.scene";

var game = new Game(800, 600, [IntroScene, MenuScene, Scene1 ]);