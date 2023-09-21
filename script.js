// Creating the board cells
let board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

// constants
const colors = {
    'null': 'white',
    '1': 'green',
    '-1': 'blue'
};

const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// state variables
let boardArray, turn, winner;

// cached elements
const cells = Array.from(document.querySelectorAll('.cell')); // or [...document.querySelectorAll('.cell')];
const resetBtn = document.querySelector('.resetBtn');

// functions
function initialize() {
    boardArray = [null,null,null,null,null,null,null,null,null]; //splice to update? -from yy
    turn = -1;
    winner = null;
    renderBoard();
    renderMessage();
}

function renderBoard(e) {
    boardArray.forEach((cell, cellIdx) => {
            // boardArray[cellIdx].style.backgroundColor = colors[1];
            e.target.style.backgroundColor = colors[turn];
            // console.log(e.target)
        })
}

function renderMessage() {
    console.log('who won/tie/in play - ', winner)
    if (winner !== null && winner === 'Playing') {
        console.log('whose turn:', colors[turn].toUpperCase());
    } else if (winner == 'T') {
        console.log('Tie');
    } else {
        console.log(`Congrats ${colors[turn].toUpperCase()}!`);
    }
}

board.addEventListener('click', handleCellClick);

function handleCellClick(e) {
    // e.target.style.backgroundColor = 'blue';
    const selectedCell = e.target;
    // console.log(e);
    winner = 'Playing';

    const indexOfClickedCell = cells.indexOf(selectedCell);
    // console.log(indexOfClickedCell);
    // OR
    // cells.forEach((cell, idx) => {
    //     if (cell === selectedCell) console.log(idx);
    // })

    // console.log(boardArray)
    if (boardArray[indexOfClickedCell] !== null) return;
    if (winner !== null && winner !== 'Playing') return; // could be playing?

    // update board
    boardArray[indexOfClickedCell] = turn;
    // console.log(boardArray[indexOfClickedCell])

    // update turn
console.log('before:', turn);
turn = turn * -1
console.log('after:', turn);

    // update winner
    // winner = checkWinner();
    // winningCombo.forEach(combo => {
    for (let combo of winningCombo) {
        // 3 board positions using the winning indices
        let total = boardArray[combo[0]] + boardArray[combo[1]] + boardArray[combo[2]];
        // find absolute value of total
console.log(total)
        if (total < 0) total *= -1;
console.log(total)
        if (total === 3) {
            winner = boardArray[combo[0]];
            return; // or break?
        }
        // if there is no winner and there are no more nulls in the board
        if (boardArray.indexOf(null) < 0) winner = 'T';
    }
    renderBoard(e);
    renderMessage();
}

// STOP when game is over!
// function checkWinner() {
//     // winningCombo.forEach(combo => {
//         for (let combo of winningCombo) {
//             // 3 board positions using the winning indices
//             let total = boardArray[combo[0]] + boardArray[combo[1]] + boardArray[combo[2]];
//             // find absolute value of total
//             if (total < 0) total *= -1;
//             if (total === 3) {
//                 return boardArray[combo[0]];
//             }
//             // if there is no winner and there are no more nulls in the board
//             if (boardArray.indexOf(null) < 0) return 'T';
//             // if there are null cells, still playing
//             // if (boardArray.includes(null)) return null;
//         }
// }

resetBtn.addEventListener('click', handleReplayClick);

function handleReplayClick(e) {
    // const reset = e.target;
    // console.log(reset)
    clearBoard();
    initialize();
    renderBoard(e);
    renderMessage();
}

function clearBoard() {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
}

initialize();