'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    /* Function which allows the player to flip a tile - shows if a tile has
    already been flipped, if there is a Bomb "B" in that tile or the number of bombs
    near that tile */

    value: function flipTile(rowIndex, columnIndex) {
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

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      // Changed: Apparently, the ".forEach(function( ){});"" format doesn't bring in the "this"
      // variable, so it needs to be changed to the ".forEach(( ) => {});" format instead.
      //    neighborOffsets.forEach(function(offset)
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
        // Changed: Moved the return outside of the forEach.
        //  return numberOfBombs;
        //})};
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTitles',
    value: function hasSafeTitles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
    /*function to print the board */

  }, {
    key: 'print',
    value: function print() {
      // Changed: Typo--missing "." in "this._board".
      //  console.log(this_board.map(row => row.join(' | ')).join('\n'));
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
    /*Part of the code that generates the player board*/

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var c = 0; c < numberOfColumns; c++) {
          row.push(' ');
        };
        board.push(row);
      };
      return board;
    }
    /* This part of the code is intended to generate a bomb board
    This will create the board and generate random locations for the Bombs!*/

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberofRows, numberofColumns, numberOfBombs) {
      var board = [];
      for (var i = 0; i < numberofRows; i++) {
        var row = [];
        for (var c = 0; c < numberofColumns; c++) {
          row.push(null);
        };
        board.push(row);
      };

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberofRows);
        var randomColumnIndex = Math.floor(Math.random() * numberofColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }

        /*Currently this code could produce Bombs on top of existing bombs
         - This will be fixed in later code*/
      };
      return board;
    }
  }]);

  return Board;
}();