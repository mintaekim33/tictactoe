// Creating the board cells
let board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `cell-${i}`)
    board.appendChild(cell);
}

// constants
const colors = {
    'null': 'antiquewhite',
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
// flag = won/lost

// cached elements
const cells = Array.from(document.querySelectorAll('.cell')); // or [...document.querySelectorAll('.cell')];
const resetBtn = document.querySelector('.resetBtn');
const message = document.querySelector('.message');

// functions
function initialize() {
    boardArray = [null,null,null,null,null,null,null,null,null]; //splice to update? -from yy
    turn = 1;
    winner = null;
    // add the event listener back after removing
    board.addEventListener('click', handleCellClick);
    renderMessage();
    renderBoard();
}

function renderBoard() {
    boardArray.forEach((cell, cellIdx) => {
        // console.log(boardArray)
            // boardArray[cellIdx].style.backgroundColor = colors[1];
            // const cellElement = boardArray[boardArray.indexOf[e.target]]
            const cellElement = document.getElementById(`cell-${cellIdx}`);
            // console.log(cellElement)
            cellElement.style.backgroundColor = colors[cell];
            // e.target.style.backgroundColor = colors[turn];
        })
}

function renderMessage() {
    // if (winner === null) {
    //     console.log('whose turn:', colors[turn].toUpperCase());
    // } else if (winner === 'T') {
    //     console.log('Tie');
    // } else {
    //     console.log(`Congrats ${colors[turn].toUpperCase()}!`);
    // }

    if (winner === null) message.innerHTML = `${colors[turn].toUpperCase()}'s Turn!`;
    else if (winner === 'T') message.innerHTML = "It's a tie";
    else { message.innerHTML = `Congrats, ${colors[turn].toUpperCase()}! You won!`};
    // if (winner === 'T') console.log("TIE");
    // else if (winner) console.log(`Congrats, ${colors[turn].toUpperCase()}! You won!`);
    // else {console.log(`${colors[turn].toUpperCase()}'s Turn!`)};
}

board.addEventListener('click', handleCellClick);

function handleCellClick(e) {
    const selectedCell = e.target;
    const indexOfClickedCell = cells.indexOf(selectedCell);
    // OR
    // cells.forEach((cell, idx) => {
    //     if (cell === selectedCell) console.log(idx);
    // })

    if (boardArray[indexOfClickedCell] !== null) return;
    if (winner !== null) return; 

    // update board
    boardArray[indexOfClickedCell] = turn;

    // renderBoard(e);

    // update winner
    renderBoard();
    renderMessage();
    // winner = checkWinner();


    for (let combo of winningCombo) {
        
        // 3 board positions using the winning indices
        let total = boardArray[combo[0]] + boardArray[combo[1]] + boardArray[combo[2]];

        // find absolute value of total
        if (total < 0) total *= -1;
        if (total === 3) {
            winner = boardArray[combo[0]];
            // remove listener to stop the game
            board.removeEventListener('click', handleCellClick);
            renderMessage();
            return; 
        }
        // if there is no winner and there are no more nulls in the board
        if (boardArray.indexOf(null) < 0) winner = 'T';
        // if (boardArray.includes(null)) winner = null;
    }

        // update turn
        turn = turn * -1

        // check win state
        // if (winner) {
        //     board.removeEventListener('click', handleCellClick);
        // }

    // renderBoard();
    // renderMessage();
    // // if (winner) board.removeEventListener('click', handleCellClick);
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
//                 board.removeEventListener('click', handleCellClick);
//                 return boardArray[combo[0]];
//             }
//             // if there is no winner and there are no more nulls in the board
//             if (boardArray.indexOf(null) < 0) return 'T';
//             // if there are null cells, still playing
//             // if (boardArray.includes(null)) return null;
//         }
// }

resetBtn.addEventListener('click', handleReplayClick);

function handleReplayClick() {
    // const reset = e.target;
    // console.log(reset)
    clearBoard();
    initialize();
    renderMessage();
    renderBoard();
}

function clearBoard() {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
}

initialize();