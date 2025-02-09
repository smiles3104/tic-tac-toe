
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';  
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let gameOver = false;
const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        
        if (gameBoard[index] === '' && !gameOver) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            
            if (checkWinner()) {
                statusText.textContent = `${currentPlayer} wins!`;
                gameOver = true;
                return;
            }

            if (gameBoard.every(cell => cell !== '')) {  // Draw Condition
                statusText.textContent = "It's a Draw!";
                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false; 
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}