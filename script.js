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
    boardArray = [null,null,null,null,null,null,null,null,null]; //splice to update?
    turn = 1;
    winner = null;
    // renderBoard();
}

function renderBoard(e) {
    boardArray.forEach((cell, cellIdx) => {
            // boardArray[cellIdx].style.backgroundColor = colors[1];
            e.target.style.backgroundColor = colors[turn];
            // console.log(e.target)
        })
}

function renderMessage() {
    console.log(winner)
    if (winner !== null ) {
        console.log(colors[turn].toUpperCase());
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
    console.log(indexOfClickedCell);
    // OR
    // cells.forEach((cell, idx) => {
    //     if (cell === selectedCell) console.log(idx);
    // })

    // console.log(boardArray)
    if (boardArray[indexOfClickedCell] !== null) return;
    if (winner !== null && winner !== 'Playing') return; // could be playing?

    boardArray[indexOfClickedCell] = turn;
    // console.log(boardArray[indexOfClickedCell])

    turn = turn * -1

    winningCombo.forEach(combo => {
        // 3 board positions using the winning indices
        let total = boardArray[combo[0]] + boardArray[combo[1]] + boardArray[combo[2]];
        // find absolute value of total
        if (total < 0) total *= -1;
        if (total === 3) {
            winner = boardArray[combo[0]];
            return; // or break?
        }
        // if there is no winner and there are no more nulls in the board
        if (boardArray.indexOf(null) < 0) winner = 'T';
    })
    renderBoard(e);
    renderMessage();
}

resetBtn.addEventListener('click', handleReplayClick);

function handleReplayClick(e) {
    // const reset = e.target;
    // console.log(reset)
    initialize();
    renderBoard(e);
    renderMessage();
}

initialize();