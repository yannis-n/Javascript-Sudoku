export default class InputHandler {
    constructor(game, GAMESTATE) {
          this.game = game
          this.GAMESTATE = GAMESTATE  
    }

    init(){
      addEventListener('mousemove', event => {
        this.game.mouse.x = event.clientX;
        this.game.mouse.y = event.clientY;
      });

      if (this.game.gamestate === this.GAMESTATE.MENU) {
        document.addEventListener("click", e => {
          this.game.checkPlayButtonClick(e.clientX, e.clientY);
        });
      }

  
      if (this.game.gamestate === this.GAMESTATE.RUNNING) {
        
        document.addEventListener("click", e => {
          this.game.selectUnitClick(e.clientX, e.clientY);
        });

        document.addEventListener("keydown", event => {
          const isNumber = /^[0-9]$/i.test(event.key)
          if (isNumber){
            console.log(true)
            this.game.fillNumber(event.key)
          }else{
            console.log(event.keyCode)
            switch (event.keyCode) {
              case 37:
                this.game.moveLeft();
                break;
      
              case 39:
                this.game.moveRight();
                break;
              case 38:
                this.game.moveUp();
              break;
              case 40:
                this.game.moveDown();
              break;
      
              // case 27:
              //   game.togglePause();
              //   break;
      
              // case 32:
              //   game.start();
              //   break;
            }
          }
        });

        
      }
    }
  }
  