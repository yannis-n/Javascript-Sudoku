


const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

const unitMeasurement = {
  unitWidth : 40,
  unitHeight : 40
};

const PUZZLE = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const PUZZLESOLUSTION = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

import { createBoard, drawBoard } from "/src/sudokuBuilder.js";

export default class Game {
  constructor(gameWidth, gameHeight, difficulty) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.difficulty = difficulty
    this.board = createBoard(this, PUZZLE, unitMeasurement)
    this.units = drawBoard(this, unitMeasurement)
    // new InputHandler(this.paddle, this);
  }

  start() {
  }

  update(deltaTime) {

  }

  draw(ctx) {
    [...this.units].forEach((object) => object.draw(ctx));

  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
