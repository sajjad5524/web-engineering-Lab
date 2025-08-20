const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const input1 = document.getElementById('player1Input');
const input2 = document.getElementById('player2Input');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleMove(player, inputField) {
  const index = parseInt(inputField.value);
  inputField.value = ''; // clear the input

  if (!gameActive || isNaN(index) || index < 0 || index > 8) return;
  if (board[index] !== '') {
    alert("Cell already taken!");
    return;
  }

  board[index] = player;
  const cell = document.querySelector(`.cell[data-cell-index="${index}"]`);
  cell.textContent = player;
  cell.classList.add('filled');

  if (checkWin(player)) {
    statusText.textContent = `Player ${player} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return winningConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell, index) => {
    cell.textContent = index;
    cell.classList.remove('filled');
  });
  input1.value = '';
  input2.value = '';
}

input1.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && currentPlayer === 'X') {
    handleMove('X', input1);
  }
});

input2.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && currentPlayer === 'O') {
    handleMove('O', input2);
  }
});

resetButton.addEventListener('click', resetGame);