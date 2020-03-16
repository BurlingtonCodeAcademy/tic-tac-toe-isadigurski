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
let winningconditons = [[c0, c1, c2], [c3, c4, c5], [c6, c7, c8], [c0, c3, c6], [c1, c4, c7], [c2, c5, c8], [c0, c4, c8], [c2, c4, c6]]
//Players and Status
let playerX = '<img src="./jsscr/X.png" height="120" width="120" id="x">'
let playerO = '<img src="./jsscr/O.png" height="130" width="130" id="o">'
currentPlayer = playerX
let message = document.getElementById('status')
//Adds name to status section for Player 1
let item = document.getElementById('player1name')
let addButton = document.getElementById('start1')
let itemList = document.getElementById('status')
//-------------------------------------------------------------
//Start Game 1 Player
let startButton = document.getElementById("start1")
startButton.addEventListener('click', () => {
    activateSquare()
    AI()
    startTimer()
})

function activateSquare() {
    c0.addEventListener('click', event), c1.addEventListener('click', event), c2.addEventListener('click', event), c3.addEventListener('click', event), c4.addEventListener('click', event), c5.addEventListener('click', event), c6.addEventListener('click', event), c7.addEventListener('click', event), c8.addEventListener('click', event)
    message.innerHTML = 'Current Player X'
}

//Start Game 2 Player
let startButton2 = document.getElementById("start2")
startButton2.addEventListener('click', () => {
    activateSquare2()
    startTimer()
})

function activateSquare2() {
    c0.addEventListener('click', event), c1.addEventListener('click', event), c2.addEventListener('click', event), c3.addEventListener('click', event), c4.addEventListener('click', event), c5.addEventListener('click', event), c6.addEventListener('click', event), c7.addEventListener('click', event), c8.addEventListener('click', event)
    message.innerHTML = 'Current Player X'
}

//Human vs Computer

function AI() {

//Guess a random square
    function randomInt(min, max) {
        let range = max - min + 1
        return min + Math.floor(Math.random() * range)
    }

//
    let aiSquare = randomInt(cells)
    console.log(aiSquare)
    console.log(cellArray[aiSquare])

    if (cellArray[aiSquare].textContent === "") {
        cellArray[aiSquare].textContent = '0'
        status.textContent = "Human's Turn"
        winningLine()

        if (winningLine() === 'true') {
            status.textContent = "Computer Wins"
        }
    } else {
        AI()
    }
}

//Switches between X and O and draws the player symbol, and blocks square in 2 Player mode
function event(event) {

    if (event.target.innerHTML) {
        message.innerHTML = 'SQUARE IS OCCUPIED'
    } else {
        event.target.innerHTML = currentPlayer
        //
        if (currentPlayer === playerX) {
            currentPlayer = playerO
            message.innerHTML = 'Current Player O'
            winningLine()
        } else {
            currentPlayer = playerX
            item.innerHTML = 'Current Player X'
            winningLine()
        }
    }
}
//Discovers a winning combination in 1 Player mode and 2 Player mode
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
                deactivateSquares()
                clearBoard()
                break;
            }
        }
    }
    draw()
}
//Clears board game and reset board after 3 seconds
function clearBoard() {
    window.setTimeout(reloadDocument, 3000);
}

function reloadDocument() {
    document.location.reload();
    clearInterval(interval);
}

//Stops player from clicking on squares after winner is announced
function deactivateSquares() {
    c0.removeEventListener('click', event), c1.removeEventListener('click', event), c2.removeEventListener('click', event), c3.removeEventListener('click', event), c4.removeEventListener('click', event), c5.removeEventListener('click', event), c6.removeEventListener('click', event), c7.removeEventListener('click', event), c8.removeEventListener('click', event)
}

//Add players names when selecting 2 player or 1 player (x)

addButton.addEventListener('click' , function() {
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
        document.getElementById("hours").innerHTML = parseInt(min / 60);
    }, 1000);

    //Discovers a draw
    function draw() {
        boardfull = cells.filter(function (cell) {
            return cell.innerHTML !== ""
        })
        if (boardfull.length === 9 && !winner) {
            message.innerHTML = "draw"
            clearBoard()
        }
    }
}