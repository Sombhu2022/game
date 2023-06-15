// Game variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];


// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to handle a player's move
function makeMove(cellIndex) {
  if (gameState[cellIndex] === '' && gameActive) {
    gameState[cellIndex] = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].innerHTML = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].classList.add(currentPlayer);
  

    if(currentPlayer == 'X')
    {
    document.getElementsByClassName('cell')[cellIndex].style.backgroundColor="green";
    }
    else{
      document.getElementsByClassName('cell')[cellIndex].style.backgroundColor="red";

    }


  }
      // Check if the current player has won
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        gameState[a] === currentPlayer &&
        gameState[b] === currentPlayer &&
        gameState[c] === currentPlayer
      ) {
        roundWon = true;
        break;
      }
    }

    // If the current player has won
    if (roundWon) {
      document.getElementById('board').classList.add('disabled');
      document.getElementById('board').classList.add(currentPlayer + '-win');
      document.getElementById('board').classList.remove(currentPlayer);

      // Display the winning message
      document.querySelector('.container').innerHTML = `
        <h1>${currentPlayer} wins!</h1>
        <button onclick="resetBoard()" >Play Again</button>
      `;
     
      gameActive = false;
      return;
    }

    // Check if the game ended in a draw
    if (!gameState.includes('')) {
      // Display the draw message
      document.querySelector('.container').innerHTML = `
        <h1>It's a draw!</h1>
        <button onclick="resetBoard()">Play Again</button>

      `;
      
      gameActive = false;
      return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    
  }
// Function to reset the game board
// Function to reset the game board
function resetBoard() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];

  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('X');
    cells[i].classList.remove('O');
  }

  // document.getElementById('board').classList.remove('disabled');
  // document.getElementById('board').classList.remove('X-win');
  // document.getElementById('board').classList.remove('O-win');

  // Re-attach event listeners to the cells
  for (let i = 0; i < cells.length; i++) {
    cells[i].setAttribute('onclick', `makeMove(${i})`);
  }

  // Restore the initial HTML content
  document.querySelector('.container').innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div id="board" class="board">
      <div class="cell" onclick="makeMove(0)"></div>
      <div class="cell" onclick="makeMove(1)"></div>
      <div class="cell" onclick="makeMove(2)"></div>
      <div class="cell" onclick="makeMove(3)"></div>
      <div class="cell" onclick="makeMove(4)"></div>
      <div class="cell" onclick="makeMove(5)"></div>
      <div class="cell" onclick="makeMove(6)"></div>
      <div class="cell" onclick="makeMove(7)"></div>
      <div class="cell" onclick="makeMove(8)"></div>
    </div>
    <button onclick="resetBoard()">Reset</button>

  `;
}

