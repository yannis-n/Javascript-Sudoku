
export default class Unit {
  constructor(game, position, unitMeasurement, row, col) {

    this.game = game;

    this.position = position;
    this.width = 40;
    this.height = 40;
    this.row = row;
    this.col = col;
    this.width = unitMeasurement.unitWidth;
    this.width = unitMeasurement.unitHeight;
  }

  update() {

  }

  drawUnit(ctx, row, col, start, end ){
    console.log(start)
    ctx.strokeStyle="rgba(0,0,0,0.7)";
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineWidth =0.3;
    if ((this.row == 0 && start[1] == end[1] && start[0] < end[0])
        || (this.row == 8 && start[1] == end[1] && start[0] > end[0])
        || (this.col == 0 && start[0] == end[0] && start[1] > end[1])
        || (this.col == 8 && start[0] == end[0] && start[1] < end[1])
        || (this.col % 3 == 2 && start[0] == end[0] && start[1] < end[1])
        || (this.row % 3 == 2 && start[1] == end[1] && start[0] > end[0])){
      ctx.lineWidth =2;

    }
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
  }

  // draw the unit rect with different border widths
  draw(ctx) {
    const row = this.row;
    const col = this.col;

    let path = [
      [this.position.x, this.position.y],
      [this.position.x + this.width, this.position.y],
      [this.position.x + this.width, this.position.y + this.height],
      [this.position.x, this.position.y + this.height]
    ]
    console.log(path)

    for (const i in path) {
      this.drawUnit(ctx, this, col, path[parseInt(i)%4], path[(parseInt(i) + 1)%4] )

    }
    

    
    ctx.beginPath();

  
  }
}
