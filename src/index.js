import Sudoku from "/src/game.js";
"use strict";

var PIXEL_RATIO = (function () {
  var ctx = document.getElementById("gameScreen").getContext("2d"),
      dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

  return dpr / bsr;
})();


function createHiDPICanvas (w, h, ratio) {
  if (!ratio) { ratio = PIXEL_RATIO; }
  var can = document.getElementById("gameScreen");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
}


let canvas = document.getElementById("gameScreen");
var rect = canvas.getBoundingClientRect();
canvas = createHiDPICanvas(rect.width, rect.height);

let ctx = canvas.getContext('2d');

// let ctx = setupCanvas(canvas);

const GAME_WIDTH = rect.width;
const GAME_HEIGHT = rect.height;
const difficulty = 1;

let sudoku = new Sudoku(GAME_WIDTH, GAME_HEIGHT, difficulty);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
  
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
    sudoku.draw(ctx)
  
    requestAnimationFrame(gameLoop);
  }
  
  requestAnimationFrame(gameLoop);
  