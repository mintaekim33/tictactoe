// Creating the board cells
let board = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `cell-${i}`)
    board.appendChild(cell);
}

// Constants
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

// State variables
let boardArray, turn, winner;

// Cached elements
const cells = Array.from(document.querySelectorAll('.cell')); // or [...document.querySelectorAll('.cell')];
const resetBtn = document.querySelector('.resetBtn');
const message = document.querySelector('.message');

// Functions
// Initialize state variables
function initialize() {
    boardArray = [null,null,null,null,null,null,null,null,null];
    turn = 1;
    winner = null;
    // Add the event listener back after removing
    board.addEventListener('click', handleCellClick);
    renderBoard();
    renderMessage();
}

// Update the board display
function renderBoard() {
    boardArray.forEach((cell, cellIdx) => {
            // boardArray[cellIdx].style.backgroundColor = colors[1];
            // const cellElement = boardArray[boardArray.indexOf[e.target]]
            const cellElement = document.getElementById(`cell-${cellIdx}`);
            cellElement.style.backgroundColor = colors[cell];
            // e.target.style.backgroundColor = colors[turn];
        })
}

// Update the message display
function renderMessage() {
    if (winner === null) message.innerHTML = `${colors[turn].toUpperCase()}'s Turn!`;
    else if (winner === 'T') message.innerHTML = "It's a tie";
    else { message.innerHTML = `Congrats, ${colors[turn].toUpperCase()}! You won!`};
}

// Add click event listener when the user clicks on a cell
board.addEventListener('click', handleCellClick);
function handleCellClick(e) {
    console.log(turn)
    const selectedCell = e.target;
    const indexOfClickedCell = cells.indexOf(selectedCell);
    // OR
    // cells.forEach((cell, idx) => {
    //     if (cell === selectedCell) console.log(idx);
    // })

    if (boardArray[indexOfClickedCell] !== null) return;
    if (winner !== null) return; 

    // Change the selected board element to the player
    boardArray[indexOfClickedCell] = turn;

    // Render board and message display
    renderBoard();
    renderMessage();

    // Check for any winning combination
    for (let combo of winningCombo) {
        
        // Sum up the player (1 or -1) for winning combo positions
        let total = boardArray[combo[0]] + boardArray[combo[1]] + boardArray[combo[2]];

        // Calculate the absolute value of total
        if (total < 0) total *= -1;
        if (total === 3) {
            winner = boardArray[combo[0]];
            // Remove click event listener to stop the game
            board.removeEventListener('click', handleCellClick);
            // Update the message display to show the winner
            renderMessage();
            return; 
        }
        // Check when there is no winner and there are no more nulls in the board
        if (boardArray.indexOf(null) < 0) winner = 'T';
        // if (boardArray.includes(null)) winner = null;
    }

        // Swap turns
        turn = turn * -1;
        
        // Update message display
        renderMessage();
}

// Add click event listener for the reset button
resetBtn.addEventListener('click', handleReplayClick);

// Clear board and reset the game to the original state
function handleReplayClick() {
    clearBoard();
    initialize();
    renderBoard();
    renderMessage();
}

// Clear the colors in the board
function clearBoard() {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
}

// Initialize the game
initialize();