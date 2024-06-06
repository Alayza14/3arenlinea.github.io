let board;
let currentPlayer;
let gameActive;
let moveCount;
let versusMode; // 'player' or 'machine'

function startGame(mode) {
    versusMode = mode;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    initGame();

    // Iniciar la música de fondo
    let music = document.getElementById('background-music');
    music.play();
}

function showInstructions() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('instructions-screen').classList.remove('hidden');
}

function goHome() {
    document.getElementById('instructions-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
    initGame();

    // Detener la música de fondo
    let music = document.getElementById('background-music');
    music.pause();
    music.currentTime = 0;
}

function initGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    moveCount = 0;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

function makeMove(index) {
    if (gameActive && !board[index]) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;
        moveCount++;
        if (checkWin()) {
            setTimeout(() => {
                alert(`¡Felicidades! ${currentPlayer} ha ganado en ${moveCount} movimientos`);
            }, 10);
            gameActive = false;
        } else if (board.every(cell => cell)) {
            setTimeout(() => {
                alert('¡Empate!');
            }, 10);
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (versusMode === 'machine' && currentPlayer === 'O') {
                setTimeout(machineMove, 500); // Delay para que parezca más humano
            }
        }
    }
}

function machineMove() {
    if (!gameActive) return;

    let emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]  // diagonales
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function restartGame() {
    initGame();
}
