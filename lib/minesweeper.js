'use strict';

/* The program is a minesweeper program It will generate a Player Board and
a board with Bombs. Currently the boards are being generated dynamically
while most of the play is being done with hard code*/

/*Part of the code that generates the player board*/
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var c = 0; c < numberOfColumns; c++) {
      row.push(' ');
    };
    board.push(row);
  };
  return board;
};
generatePlayerBoard(2, 3);

/* This part of the code is intended to generate a bomb board
This will create the board and generate random locations for the Bombs!*/
var generateBombBoard = function generateBombBoard(numberofRows, numberofColumns, numberOfBombs) {
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
};
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;

  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = columnIndex + offset[0];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log("This tile has already been flipped!");
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

playerBoard = generatePlayerBoard(3, 4);
bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board');
printBoard(playerBoard);
console.log('Bomb Board');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board');
printBoard(playerBoard);