// const squares = new Array(9);

// squares.forEach(square => {
//     let div = document.createElement('div');
// })

// const board = document.querySelector('#board');
// let div = document.createElement('div');
// board.appendChild(div);


// constants
const colors = {
    "null": "white",
    "1": "green",
    "-1": "blue"
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
let boardArray = [[0,1,2],[3,4,5],[6,7,8]];
let boardArray2d = [0,1,2,3,4,5,6,7,8];
let turn = [1, -1];
let winner = ['win', 'tie', 'playing'];

// cached elements
let board = document.getElementById('board');
const cell = document.querySelector('.cell');
const cells = Array.from(document.querySelectorAll('.cell')); // or [...document.querySelectorAll('.cell')];
// const cell1 = document.querySelector('.cell1');
// const cell2 = document.querySelector('.cell2');
// const cell3 = document.querySelector('.cell3');
// const cell4 = document.querySelector('.cell4');
// const cell5 = document.querySelector('.cell5');
// const cell6 = document.querySelector('.cell6');
// const cell7 = document.querySelector('.cell7');
// const cell8 = document.querySelector('.cell8');
// const cell9 = document.querySelector('.cell9');

// functions
function initialize() {
    // how to map
    boardArray = [[null,null,null],[null,null,null],[null,null,null]];
    turn = 1;
    winner = null;
    renderBoard();
}

function renderBoard() {
    boardArray.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
            boardArray[rowIdx][cellIdx].style.backgroundColor = colors[1];
        }
    )})
}

function renderMessage() {
    if (winner !== null) {
        winner = colors[1].toUpperCase();
    } else if (winner == 'T') {
        return 'Tie';
    } else {
        return `Congrats ${colors[1].toUpperCase()}!`;
    }
}

board.addEventListener('click', handleClick);
// cell.addEventListener('click', handleClick); - why doesn't this work

/// let boardArray = [[0,1,2],[3,4,5],[6,7,8]];
function handleClick(e) {
    const selectedCell = e.target;
    // console.log(e);

    const indexOfClickedCell = cells.indexOf(selectedCell);
    console.log(indexOfClickedCell);
    // OR
    // cells.forEach((cell, idx) => {
    //     if (cell === selectedCell) console.log(idx);
    // })

    console.log(boardArray)
    if (boardArray2d[indexOfClickedCell] !== null) return;
    if (winner !== null) return;

    boardArray2d[indexOfClickedCell] = turn;

    turn = turn * -1

    winningCombo.forEach(combo => {
        // 3 board positions using the winning indices
        boardArray2d[]
    })
}