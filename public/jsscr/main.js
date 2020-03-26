//Reassign Squares
let c0 = document.getElementById('cell-0')
let c1 = document.getElementById('cell-1')
let c2 = document.getElementById('cell-2')
let c3 = document.getElementById('cell-3')
let c4 = document.getElementById('cell-4')
let c5 = document.getElementById('cell-5')
let c6 = document.getElementById('cell-6')
let c7 = document.getElementById('cell-7')
let c8 = document.getElementById('cell-8')
//Boolean value for if there is a winner
let winner = false
//Cells Array
let cells = [c0, c1, c2, c3, c4, c5, c6, c7, c8]
//Winning Arrays
let winningconditons = [
    [c0, c1, c2],
    [c3, c4, c5],
    [c6, c7, c8],
    [c0, c3, c6],
    [c1, c4, c7],
    [c2, c5, c8],
    [c0, c4, c8],
    [c2, c4, c6]
]
//Players and Status
let playerX = '<img src="./jsscr/PlayerImage/X.png" height="120" width="120" id="x">'
let playerO = '<img src="./jsscr/PlayerImage/O.png" height="130" width="130" id="o">'
currentPlayer = playerX
let message = document.getElementById('status')
//Adds name to status section for Player 1
let item = document.getElementById('player1name')
let addButton = document.getElementById('start1')
let itemList = document.getElementById('status')
let turns = 0;
let computerPlayer = false;
//-------------------------------------------------------------Functions For Games
//Discovers a winning combination in 2 Player mode

function winningLine() {
    for (let winningArrays of winningconditons) {
        let firstCell = winningArrays[0].innerHTML;
        let secondCell = winningArrays[1].innerHTML;
        let thirdCell = winningArrays[2].innerHTML;
        if (firstCell !== "") {
            if (firstCell === secondCell && secondCell === thirdCell) {
                winner = true;
                message.innerHTML = 'WINNER'
                winningArrays[0].style.backgroundColor = "blue"
                winningArrays[1].style.backgroundColor = "blue"
                winningArrays[2].style.backgroundColor = "blue"
                clearInterval(timer);
                deactivateSquares()
                clearBoard()
                return true;
            }
        }
    }
    draw()
    return false;
}
//Clears board game and reset board after 3 seconds

function clearBoard() {
    window.setTimeout(reloadDocument, 3000);
}

function reloadDocument() {
    document.location.reload();
    // clearInterval(interval);
}

//Stops player from clicking on squares after winner is announced

function deactivateSquares() {
    cells.forEach(cell => {
        cell.removeEventListener('click', twoplayer);
    })
}

function deactivateSquaresAI() {
    cells.forEach(cell => {
        cell.removeEventListener('click', AI);
    })
}
//Add players names when selecting 2 player or 1 player (x)

addButton.addEventListener('click', function () {
    let newName = document.createElement("ol")
    let itemText = document.createTextNode(item.value)

    newName.appendChild(itemText)

    itemList.appendChild(newName)
    item.value = ""
})

//Timer

function startTimer() {

    let sec = 0

    timer = setInterval(function () {
        sec += 1
        document.getElementById("seconds").innerHTML = (sec % 60);
        document.getElementById("minutes").innerHTML = parseInt(sec / 60);
    }, 1000);
}
//Discovers a draw

function draw() {
    boardfull = cells.filter(function (cell) {
        return cell.innerHTML !== ""
    })
    if (boardfull.length === 9 && !winner) {
        message.innerHTML = "draw"
        clearInterval(timer);
        clearBoard()
        if(computerPlayer) deactivateSquaresAI();
        if(!computerPlayer) deactivateSquares();
    }
}
//.................................................................................................Games
//Start Game 1 Player
let startButton = document.getElementById("start1")
startButton.addEventListener('click', () => {
    activateSquare()
    computerPlayer = true;
    startTimer()
})

function activateSquare() {
    cells.forEach(cell => {
        cell.addEventListener('click', AI)
    })
    message.innerHTML = 'Current Player X'
}

//Guess a random square for Human vs AI

function randomInt(min, max) {
    let range = max - min + 1
    return min + Math.floor(Math.random() * range)
}

//Human vs AI

function AI() {

    //Wrap in an if statement, if turn equal computer, under if is another else 'players turn'
    if (currentPlayer === playerO) {
        //Pick random cell 0-8 for cells 0 to 8
        let aiSquare = randomInt(0, 8);
        console.log(aiSquare)
        console.log(cells[aiSquare])

        //If the cell is empty, set innerHTML to playerO img
        if (cells[aiSquare].innerHTML === "") {
            cells[aiSquare].innerHTML = playerO
            turns++;    //Increment turns
            currentPlayer = playerX;    //Switch player
            message.innerHTML = 'Current Player X'  //Switch message
            winner = winningLine()    //Check if there is a winner

            //If winner, computer wins
            if (winner) {
                status.textContent = "Computer Wins"
                deactivateSquaresAI();
            }
        //If cell is not empty, recursively call AI function
        } else {
            AI()
        }
    //Human (X) turn
    } else {
        //If clicked square is full
        if (event.target.innerHTML) {
            console.log(event.target.innerHTML)
            message.innerHTML = 'SQUARE IS OCCUPIED'
        //Square is empty
        } else {
            //Set innerHTML to currentPlayer (X)
            event.target.innerHTML = currentPlayer
            turns++;    //Increment turns
            currentPlayer = playerO     //Switch current player to O
            message.innerHTML = 'Current Player O'  //Switch message
            winner = winningLine()  //Check if there is a winner
            //No winner, computer's turn
            if(!winner && turns < 9) {
                AI()
                //If winner, human wins
            } else {
                status.textContent = 'Human Wins'
                deactivateSquaresAI();
            }
        }
    }
}
//.................................................................................
//Start Game 2 Player
let startButton2 = document.getElementById("start2")
startButton2.addEventListener('click', () => {
    activateSquare2()
    startTimer()
})

function activateSquare2() {
    cells.forEach(cell => {
        cell.addEventListener('click', twoplayer)
    })
    message.innerHTML = 'Current Player X'
}

//Switches between X and O and draws the player symbol, and blocks square in 2 Player mode
function twoplayer(event) {

    if (event.target.innerHTML) {
        message.innerHTML = 'SQUARE IS OCCUPIED'
    } else {
        event.target.innerHTML = currentPlayer
        //
        if (currentPlayer === playerX) {
            currentPlayer = playerO
            message.innerHTML = 'Current Player O'
            winner = winningLine()
        } else {
            currentPlayer = playerX
            item.innerHTML = 'Current Player X'
            winner = winningLine()
        }
    }
    if(winner) {
        console.log('winner winner')
        deactivateSquares();
    }
}