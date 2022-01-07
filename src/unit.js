
export default class Unit {
  constructor(game, position, unitMeasurement, row, col) {

    this.game = game;

    this.position = position;
    this.width = unitMeasurement.unitWidth;
    this.height = unitMeasurement.unitHeight;
    this.row = row;
    this.col = col;
    this.path = [
      [this.position.x, this.position.y],
      [this.position.x + this.width, this.position.y],
      [this.position.x + this.width, this.position.y + this.height],
      [this.position.x, this.position.y + this.height]
    ] 
  }


  updateSize(position, unitMeasurement) {
    this.position = position;
    this.width = unitMeasurement.unitWidth;
    this.height = unitMeasurement.unitHeight;
    this.path = [
      [this.position.x, this.position.y],
      [this.position.x + this.width, this.position.y],
      [this.position.x + this.width, this.position.y + this.height],
      [this.position.x, this.position.y + this.height]
    ]
  }

  drawUnit(ctx, row, col, start, end ){
    ctx.strokeStyle="rgba(0,0,0,0.9)";
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineWidth =0.2;
    if ((this.row == 0 && start[1] == end[1] && start[0] < end[0])
        || (this.row == 8 && start[1] == end[1] && start[0] > end[0])
        || (this.col == 0 && start[0] == end[0] && start[1] > end[1])
        || (this.col == 8 && start[0] == end[0] && start[1] < end[1])){
      ctx.lineWidth =2;

    }else if ((this.col % 3 == 2 && start[0] == end[0] && start[1] < end[1])
    || (this.row % 3 == 2 && start[1] == end[1] && start[0] > end[0])){
        ctx.lineWidth =1;

      }
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();

   
  }

  drawSelectedColors(ctx){
   // add fill if the specific unit is selected
   const row = this.row;
  const col = this.col;

  let path = this.path 

   if (this.game.selectedUnit.row == this.row && this.game.selectedUnit.col == this.col){
      ctx.beginPath();

      ctx.rect(path[0][0], path[0][1], this.width, this.height);
      ctx.fillStyle = "rgb(187, 222, 251, 1)";
      ctx.fill();
    }else if ((this.game.selectedUnit.row == this.row && this.game.selectedUnit.col != this.col)
    || (this.game.selectedUnit.row != this.row && this.game.selectedUnit.col == this.col)
    || (parseInt(this.game.selectedUnit.row / 3) * 3 == parseInt(this.row / 3) * 3 && parseInt(this.game.selectedUnit.col / 3) * 3 == parseInt(this.col / 3) * 3)){
      ctx.beginPath();

      ctx.rect(path[0][0], path[0][1], this.width, this.height);
      ctx.fillStyle = "rgb(226, 235, 243, 1)";
      ctx.fill();
    }
  }

  // draw the unit rect with different border widths
  draw(ctx) {
    const row = this.row;
    const col = this.col;

    let path = this.path   

    // draw the unit perimeter
    for (const i in path) {
      this.drawUnit(ctx, row, col, path[parseInt(i)%4], path[(parseInt(i) + 1)%4] )

    }
    // add a number if it exists
    if (this.game.board[row][col] != '.'){
      if(this.game.boardExample[row][col] == '.'){
        ctx.fillStyle = "#0072e3";
      }else{
        ctx.fillStyle = "#000";

      }
      ctx.font = this.game.unitMeasurement.unitWidth / 2 + "px Source Sans Pro,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';

      ctx.fillText(this.game.board[row][col], this.position.x + this.width/2, this.position.y + this.height/2);
    }


    

    
    ctx.beginPath();

  
  }
}
