const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const statusMessage = document.getElementById('status-message');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical wins
        [0, 4, 8], [2, 4, 6]              // Diagonal wins
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
};

const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');
    if (gameState[index]) return; // If the square is already filled, do nothing

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        statusMessage.textContent = `${winner} wins!`;
        board.removeEventListener('click', handleClick);
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusMessage.textContent = 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;

    const squares = board.querySelectorAll('.square');
    squares.forEach(square => square.textContent = '');

    board.addEventListener('click', handleClick);
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

statusMessage.textContent = `Player ${currentPlayer}'s turn`;
