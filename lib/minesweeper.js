/* The program is a minesweeper program It will generate a Player Board and
a board with Bombs. Currently the boards are being generated dynamically
while most of the play is being done with hard code*/
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('You hit a bomb, the game is over - whah, whah');
      this._board.print();
    } else if (this._board.hasSafeTitles()) {
      console.log('You have won the game! You are a God Among Men & Women');
    } else {
      console.log('Current Board');
      this._board.print();
    }
  }

}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  /* Function which allows the player to flip a tile - shows if a tile has
  already been flipped, if there is a Bomb "B" in that tile or the number of bombs
  near that tile */

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  /*Function that counts the number bombs around the flipped tile*/

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(function (offset) {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }

      return numberOfBombs;
    });
  }
  hasSafeTitles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }
  /*function to print the board */
  print() {
    console.log(this_board.map(row => row.join(' | ')).join('\n'));
  }
  /*Part of the code that generates the player board*/
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let c = 0; c < numberOfColumns; c++) {
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  }
  /* This part of the code is intended to generate a bomb board
  This will create the board and generate random locations for the Bombs!*/
  static generateBombBoard(numberofRows, numberofColumns, numberOfBombs) {
    const board = [];
    for (let i = 0; i < numberofRows; i++) {
      let row = [];
      for (let c = 0; c < numberofColumns; c++) {
        row.push(null);
      };
      board.push(row);
    };

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberofRows);
      let randomColumnIndex = Math.floor(Math.random() * numberofColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }

      /*Currently this code could produce Bombs on top of existing bombs
       - This will be fixed in later code*/
    };
    return board;
  }
}

/*Sets the size of the player's board, the bomb board, and determines the number
of bombs on the board */
///playerBoard = generatePlayerBoard(3,4);
///bombBoard = generateBombBoard(3,4,5);

/*Prints the "Players Board" - blank*/
///console.log('Player Board');
///printBoard(playerBoard);

/*Prints the Bomb Board - will be removed in the future*/
///console.log('Bomb Board');
///printBoard(bombBoard);

/*Call flip tile function to flip a tile on both the bomb board, the player's
board and determine which tile to flip - hard coded to be space 0,0*/
///flipTile(playerBoard,bombBoard,0,0);

/*Prints the board with the flipped tile and the results - i.e. number of
neighbor bombs, if there was a bomb or if the tile was already flipped*/
///console.log('Updated Player Board');
///printBoard(playerBoard);

const g = new Game(3, 3, 3);
g.playMove(0, 0);