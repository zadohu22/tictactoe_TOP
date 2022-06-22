let currentPlayer;
let playerOne;
let playerTwo;
const winningCombinations =  [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
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

  x.addEventListener("click", () => {
    playerOne = Player('x').getSign();
    currentPlayer = playerOne;
    playerTwo = Player('o').getSign();
    x.classList.add('hide');
    o.classList.add('hide');
    
  })
  o.addEventListener("click", () => {
    playerOne = Player('o').getSign();
    currentPlayer = playerOne;
    playerTwo = Player('x').getSign();
    x.classList.add('hide');
    o.classList.add('hide');
  });
  
}

const flipTurn = () => {
   if(currentPlayer === playerOne){
    currentPlayer = playerTwo;
  }else if(currentPlayer === playerTwo){
    currentPlayer = playerOne;
  }
}

const gameBoard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];
  
 
  setSignPlayerOne();
  
  let cells = document.querySelectorAll(".cell");
  
  let cellValues = cells.forEach((cell, i) => {
      cell.textContent = board[i];
      cell.addEventListener("click", () => {
   
      if(cell.textContent == ""){
        board.splice(i, 1, currentPlayer);
        console.log(board)
        cell.textContent = board[i];
        flipTurn();
        checkWin(currentPlayer);
     }
    });
    });
  

  return { cellValues };
};

gameBoard();