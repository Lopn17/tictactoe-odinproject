const tiles = document.querySelectorAll('.tiles');
const playerTurn = document.querySelector('#playerTurn');

let board = [
    '', '', '',
    '', '', '',
    '', '', ''
];

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

let state = 'O';

function resetBoard() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    state = 'O';

    tiles.forEach(tile => {
        tile.textContent = '';
    });
}



function checkWinner() {

    // Cek semua kemungkinan menang
    for (const condition of winCondition) {

        const [a, b, c] = condition;

        if (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }

    return null;
}

tiles.forEach((tile, index) => {

    tile.addEventListener('click', () => {

        // Jangan bisa diklik lagi
        if (tile.textContent !== '') return;

        // Player O
        if (state === 'O') {
            tile.textContent = 'O';
            tile.style.color = 'blue';
            board[index] = 'O';
        }

        // Player X
        else {
            tile.textContent = 'X';
            tile.style.color = 'red';
            board[index] = 'X';
        }

        // ==========================
        // CEK PEMENANG
        // ==========================

        const winner = checkWinner();

        if (winner) {
            setTimeout(() => {
                alert(`${winner} Wins!`);
                resetBoard();
            }, 50);
            return;
        }
 
        // ==========================
        // CEK DRAW
        // ==========================

        if (board.every(cell => cell !== '')) {
            alert('Draw!');
            resetBoard();
            return;
        }

        // ==========================
        // GANTI GILIRAN
        // ==========================

        state = state === 'O' ? 'X' : 'O';
        playerTurn.innerHTML = state; 
    });

});

// ==========================
// Reset Board
// ==========================

const resetBtn = document.querySelector('.reset-button');
resetBtn.addEventListener('click', ()=>{
    if (confirm("Reset Board?")) {
        alert("Board Has Been Reset!");
        resetBoard();
    }
});

