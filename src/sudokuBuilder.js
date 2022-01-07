import Unit from "../src/unit.js";

export function createBoard(game, puzzleString, unitMeasurement){
        const puzzleArray = Array.from(puzzleString)
        let board = []
        for (let i = 0; i < 9; i++) {
            const characters = puzzleArray.splice(0, 9)
            board.push(characters)
        }

        return board

  
}

export function drawBoard(game, unitsToBeUpdated = []){

    let units = [];

    // Position The Sudoku Grid in the Middle of the Game
    const centeredX = game.gameWidth / 2 - (game.unitMeasurement.unitWidth / 2) * 9;
    const centeredY = game.gameHeight / 2 - (game.unitMeasurement.unitHeight / 2) * 9;
    let i = 0

    if (unitsToBeUpdated.length > 0){
        
        unitsToBeUpdated.forEach(element => {
            i++;
            let position = {
                x: centeredX + game.unitMeasurement.unitWidth * element.col ,
                y: centeredY + game.unitMeasurement.unitHeight* element.row
            }; 
            element.updateSize(position, game.unitMeasurement)
        });
       
        return unitsToBeUpdated 
    }else{
        game.board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                i++;
                let position = {
                    x: centeredX + game.unitMeasurement.unitWidth * colIndex ,
                    y: centeredY + game.unitMeasurement.unitHeight* rowIndex
                };
                units.push(new Unit(game, position, game.unitMeasurement, rowIndex, colIndex))
            })
        })
        return units  
    }
   
}