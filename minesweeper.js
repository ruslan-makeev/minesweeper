document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [{ row: 0, col: 0, isMine: true, hidden: true }, { row: 0, col: 1, isMine: false, hidden: true }, { row: 0, col: 2, isMine: false, hidden: true }, { row: 0, col: 3, isMine: true, hidden: true },
  { row: 1, col: 0, isMine: true, hidden: true }, { row: 1, col: 1, isMine: false, hidden: true }, { row: 1, col: 2, isMine: true, hidden: true }, { row: 1, col: 3, isMine: false, hidden: true },
  { row: 2, col: 0, isMine: true, hidden: true }, { row: 2, col: 1, isMine: true, hidden: true }, { row: 2, col: 2, isMine: false, hidden: true }, { row: 2, col: 3, isMine: false, hidden: true },
  { row: 3, col: 0, isMine: true, hidden: true }, { row: 3, col: 1, isMine: false, hidden: true }, { row: 3, col: 2, isMine: false, hidden: true }, { row: 3, col: 3, isMine: true, hidden: true }]
}

function startGame() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  var restartGameButton = document.querySelector("button#restart");
  restartGameButton.addEventListener('click', restartTheGame);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

document.addEventListener("click", checkForWin)
document.addEventListener("contextmenu", checkForWin);

// Define this function to look for a win condition:
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return;
    }
  }
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
      return;
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('Good work, you did it!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++;
    }
  }
  return count;
}

function restartTheGame() {
  location.reload();
}

var board = generateBoard();

function generateBoard() {
  var cells = []

  const cellCreator = (row, col, isMine, isMarked, hidden) => {
    newCell = {
      row: row,
      col: col,
      isMine: isMine,
      isMarked: isMarked,
      hidden: hidden,
    }
    return newCell
  }

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      cellCreator(i, j, (Math.random() < 0.5), false, true);
      cells.push(newCell);
    }
  }

  var generatedBoard = { cells }
  return generatedBoard;
}