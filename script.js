let currentPlayer;
let playerOne;
let playerTwo;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return this.sign;
  };

  return { getSign };
};

const setSignPlayerOne = () => {
  let x = document.getElementById("x");
  let o = document.getElementById("o");
  x.classList.remove("hide");
  o.classList.remove("hide");
  playerOne = undefined;
  playerTwo = undefined;
  currentPlayer = undefined;

  x.addEventListener("click", () => {
    playerOne = Player("x").getSign();
    currentPlayer = playerOne;
    playerTwo = Player("o").getSign();
    x.classList.add("hide");
    o.classList.add("hide");
  });
  o.addEventListener("click", () => {
    playerOne = Player("o").getSign();
    currentPlayer = playerOne;
    playerTwo = Player("x").getSign();
    x.classList.add("hide");
    o.classList.add("hide");
  });
};

const flipTurn = () => {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else if (currentPlayer === playerTwo) {
    currentPlayer = playerOne;
  }
};

const gameBoard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let winner = false;

  setSignPlayerOne();

  let cells = document.querySelectorAll(".cell");
  let playerOneMarks = [];
  let playerTwoMarks = [];

  function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
      let index = winningCombinations[i];

      let playerOneWin = index.every((item) => playerOneMarks.includes(item));
      let playerTwoWin = index.every((item) => playerTwoMarks.includes(item));
      if (playerOneWin || playerTwoWin) {
        alert(`${currentPlayer} wins!`);
        playerOneMarks = [];
        playerTwoMarks = [];

        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => {
          cell.textContent = "";
        });
        setSignPlayerOne();
      }
    }
  }

  let cellValues = cells.forEach((cell, i) => {
    function mark() {
      if (currentPlayer === playerOne) {
        playerOneMarks.push(parseInt(cell.dataset.index));
      } else if (currentPlayer === playerTwo) {
        playerTwoMarks.push(parseInt(cell.dataset.index));
      }
    }

    cell.addEventListener("click", () => {
      if (cell.textContent == "" && currentPlayer != undefined) {
        mark();
        board.splice(i, 1, currentPlayer);
        cell.textContent = board[i];
        checkWin();
        flipTurn();
      }
    });
  });

  return { cellValues };
};

gameBoard();
