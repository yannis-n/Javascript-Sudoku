import InputHandler from "../src/input.js";
import { createBoard, drawBoard } from "../src/sudokuBuilder.js";
import { updateGameStateForHelperScreens, createAssessementSymbols, createMenu, createLoadingBar, createMenuBar, createStartingGameCountDown } from "../src/helperScreens/helperScreens.js";
import { createHiDPICanvas, circleAndMouseCollissionDetection } from "../src/helper.js";


const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  LEVELDONE: 5,
  LOADING: 6,
  ASSESSINGLEVEL: 7,
  REST: 8,
  STARTINGAME: 9
};

const PUZZLE = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const PUZZLESOLUSTION = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';


export default class Sudoku {
  constructor(gameWidth, gameHeight, difficulty, canvas) {
    this.canvas = canvas
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.updateUnitMeasurement()
    this.GAMESTATE = GAMESTATE;

    this.padding = 50;
    
    this.mouse = {
      x:0,
      y:0,
    }

    this.difficulty = difficulty
    this.board = createBoard(this, PUZZLE, this.unitMeasurement)
    this.boardExample = this.board.map(inner => inner.slice())

    this.units = drawBoard(this, this.unitMeasurement)
    this.selectedUnit = {
      row:0,
      col:0
    }

    this.InputHandler = new InputHandler(this, GAMESTATE);
    this.updateGameState(GAMESTATE.LOADING)
    this.InputHandler.init()

    // this is where all the helper screens will be loaled #helperScreensCode
    this.tutorial = 'test'
    this.undoButtonFuncionality = true;
    this.soundOn = true;
    this.correctAndWrongAssessement = true;


    this.helperScreens = {
      menu : createMenu(this, gameWidth, gameHeight),
      assessementSymbols: createAssessementSymbols(this),    
      loadingBar : createLoadingBar(this),
      menuBar : createMenuBar(this),
      startingGameCountDown: createStartingGameCountDown(this),
    }
  }

  refreshAnswers(){
    this.selectedUnit = {
      row:0,
      col:0
    }
    this.board = this.boardExample.map(inner => inner.slice())
  }

  undoAnswers(){
    this.selectedUnit = {
      row:0,
      col:0
    }
    this.board = this.boardExample.map(inner => inner.slice())
  }

  levelCompleted(){

    return this.board.filter(arr => arr.includes(".")).length == 0
  }

  correctAssessement(){
    return true;
  }
  
  updateGameSize(GAME_WIDTH, GAME_HEIGHT){
    this.gameWidth = GAME_WIDTH;
    this.gameHeight = GAME_HEIGHT;
    this.updateUnitMeasurement();
    this.units = drawBoard(this, this.units)
    this.rect = this.canvas.getBoundingClientRect()
  }


  start() {
  }

  updateUnitMeasurement(){
    
    if (this.gameWidth < 700){
      this.unitMeasurement = {
        unitWidth : this.gameWidth / 10,
        unitHeight : this.gameWidth / 10
      };
    } else if (this.gameWidth > 700){
      this.unitMeasurement = {
        unitWidth : 45,
        unitHeight : 45
      };
    }else{
      this.unitMeasurement = {
        unitWidth : this.gameWidth / 10,
        unitHeight : this.gameWidth / 10
      };
    }


  }

  update(deltaTime) {
    // Error Fliccker effect
    

    // if (this.gamestate === GAMESTATE.NEWLEVEL){
    //   if (Math.floor(this.centeredXMod) <= 0 ){
    //     this.dx = 0
    //     this.centeredXMod = 0
    //     this.updateGameState(GAMESTATE.RUNNING)

    //   }else{
    //     this.moveLevelInsideFrame()
    //   }
    //   this.centeredXMod = this.centeredXMod - this.dx;     

    // }

    updateGameStateForHelperScreens(this, GAMESTATE)

  }

  draw(ctx) {
    if (this.gamestate === GAMESTATE.RUNNING || this.gamestate === GAMESTATE.REST || this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.LEVELDONE || this.gamestate === GAMESTATE.NEWLEVEL || this.gamestate === GAMESTATE.ASSESSINGLEVEL) {
      [...this.units].forEach((object) => object.drawSelectedColors(ctx));
      [...this.units].forEach((object) => object.draw(ctx));
    }
  }

  updateGameState(state){
    this.gamestate = state;
  }

  selectUnitClick(clientX, clientY){
    let clicked = {
      x:clientX,
      y:clientY
    }
    const centeredX = this.gameWidth / 2 - (this.unitMeasurement.unitWidth / 2) * 9;

    let col = Math.floor((clicked.x - (this.gameWidth / 2 - (this.unitMeasurement.unitWidth / 2) * 9)) / this.unitMeasurement.unitWidth)
    let row = Math.floor((clicked.y - (this.gameHeight / 2 - (this.unitMeasurement.unitHeight / 2) * 9)) / this.unitMeasurement.unitHeight)

    if (0 <= row && row <= 8 && 0 <= col && col <= 8){

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
