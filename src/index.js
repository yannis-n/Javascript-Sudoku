import Game from "/src/game.js";
"use strict";
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const difficulty = 1;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, difficulty);
game.start()
game.draw(ctx)