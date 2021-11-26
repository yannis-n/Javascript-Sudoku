import Unit from "/src/unit.js";

export function createBoard(game, puzzleString, unitMeasurement){
        const puzzleArray = Array.from(puzzleString)
        let board = []
        for (let i = 0; i < 9; i++) {
            const characters = puzzleArray.splice(0, 9)
            board.push(characters)
        }

        return board

  
}

export function drawBoard(game, unitMeasurement){

    let units = [];

    // Position The Sudoku Grid in the Middle of the Game
    const centeredX = game.gameWidth / 2 - (unitMeasurement.unitWidth / 2) * 9;
    const centeredY = game.gameHeight / 2 - (unitMeasurement.unitHeight / 2) * 9;
    let i = 0
    game.board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            i++;
            let position = {
                x: centeredX + unitMeasurement.unitWidth * colIndex ,
                y: centeredY + unitMeasurement.unitHeight* rowIndex
            };
            units.push(new Unit(game, position, unitMeasurement, rowIndex, colIndex))
        })
    })
      return units
}