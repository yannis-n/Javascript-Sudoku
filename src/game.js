import InputHandler from "../src/input.js";
import { createBoard, drawBoard } from "../src/sudokuBuilder.js";
import { createMenu } from "../src/helperScreens.js";
import { createHiDPICanvas, circleAndMouseCollissionDetection } from "../src/helper.js";


const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  LOADING: 5
};

const unitMeasurement = {
  unitWidth : 50,
  unitHeight : 50
};

const PUZZLE = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const PUZZLESOLUSTION = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';


export default class Sudoku {
  constructor(gameWidth, gameHeight, difficulty) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.unitMeasurement = {
      unitWidth : gameWidth / 9,
      unitHeight : gameWidth / 9
    };
    
    this.mouse = {
      x:0,
      y:0,
    }

    this.gamestate = GAMESTATE.MENU;
    this.difficulty = difficulty
    this.board = createBoard(this, PUZZLE, this.unitMeasurement)
    this.boardExample = this.board.map(inner => inner.slice())
    this.menu = createMenu(this, gameWidth, gameHeight)

    this.units = drawBoard(this, this.unitMeasurement)
    this.selectedUnit = {
      row:0,
      col:0
    }

    this.InputHandler = new InputHandler(this, GAMESTATE);
    this.updateGameState(GAMESTATE.MENU)
    this.InputHandler.init()

  }

  start() {
  }

  update(deltaTime) {

  }

  draw(ctx) {
    if (this.gamestate === GAMESTATE.RUNNING) {
      [...this.units].forEach((object) => object.drawSelectedColors(ctx));
      [...this.units].forEach((object) => object.draw(ctx));
    }

    if (this.gamestate === GAMESTATE.MENU) {
      this.menu.draw(ctx)
    }
  }

  updateGameState(state){
    this.gamestate = state;
  }

  checkPlayButtonClick(clientX, clientY){
    if (circleAndMouseCollissionDetection(this.gameWidth/2, this.gameHeight/2, this.menu.buttonRadius, this.mouse)){
      this.updateGameState(GAMESTATE.RUNNING)
    }
  }

  selectUnitClick(clientX, clientY){
    let clicked = {
      x:clientX,
      y:clientY
    }
    const centeredX = this.gameWidth / 2 - (this.unitMeasurement.unitWidth / 2) * 9;

    let col = Math.floor((clicked.x - (this.gameWidth / 2 - (this.unitMeasurement.unitWidth / 2) * 9)) / this.unitMeasurement.unitWidth - 0.1)
    let row = Math.floor((clicked.y - (this.gameHeight / 2 - (this.unitMeasurement.unitHeight / 2) * 9)) / this.unitMeasurement.unitHeight - 0.1)

    if (0 <= row && row <= 8 && 0 <= col && col <= 8){
      console.log('selectUnitClick')

      this.selectedUnit = {
        row:row,
        col:col
      }
    }

  }

  fillNumber(number){
    let selectedUnit = this.selectedUnit
    if (this.boardExample[selectedUnit.row][selectedUnit.col] == '.'){
      this.board[selectedUnit.row][selectedUnit.col] = String(number)

    }
  }

  moveDown(){
    if (this.selectedUnit.row == 8){
      if (this.selectedUnit.col == 8){
        return;
      }
      this.selectedUnit.row = 0
      this.selectedUnit.col ++;
    }else{
      this.selectedUnit.row ++;

    }
    
  }

  moveUp(){
    if (this.selectedUnit.row == 0){
      if (this.selectedUnit.col == 0){
        return;
      }
      this.selectedUnit.row = 8
      this.selectedUnit.col --;
    }else{
      this.selectedUnit.row --;

    }
    
  }

  moveRight(){
    if (this.selectedUnit.col == 8){
      if (this.selectedUnit.row == 8){
        return;
      }
      this.selectedUnit.col = 0
      this.selectedUnit.row ++;
    }else{
      this.selectedUnit.col ++;

    }
    
  }

  moveLeft(){
    if (this.selectedUnit.col == 0){
      if (this.selectedUnit.row == 0){
        return;
      }
      this.selectedUnit.col = 8
      this.selectedUnit.row --;
    }else{
      this.selectedUnit.col --;

    }
    
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
