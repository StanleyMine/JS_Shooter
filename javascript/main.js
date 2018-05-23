import MyGame from "./mygame.js";

let canvas = document.querySelector("canvas");
let game = new MyGame(canvas);
game.loop();