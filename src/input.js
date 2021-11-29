export default class InputHandler {
    constructor(game) {
      document.addEventListener("keydown", event => {
        const isNumber = /^[0-9]$/i.test(event.key)
        if (isNumber){
          console.log(true)
          game.fillNumber(event.key)
        }else{
          console.log(event.keyCode)
          switch (event.keyCode) {
            case 37:
              game.moveLeft();
              break;
    
            case 39:
              game.moveRight();
              break;
            case 38:
            game.moveUp();
            break;
            case 40:
            game.moveDown();
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
  
      document.addEventListener("click", e => {
        game.selectUnitClick(e.clientX, e.clientY);
      });

      
    }
  }
  