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
//let cells = [c0, c1, c2, c3, c4, c5, c6, c7, c8]
//Winning Arrays
let winningconditons = [[c0, c1, c2], [c3, c4, c5], [c6, c7, c8], [c0, c3, c6], [c1, c4, c7], [c2, c5, c8], [c0, c4, c8], [c2, c4, c6]]
//
let playerX = 'X'
let playerO = 'O'
currentPlayer = playerX



//Draw a line through the winning line
//two parts (stop game and reset board) two different functions
//Reset board and start over again once a winning condition has been met
//.click()
//QA tester
//--------------------------------------------------------------------------------------
//Start Game
let startButton = document.getElementById("start")
//
startButton.addEventListener('click', activateSquare)
//
function activateSquare() {
    c0.addEventListener('click', event), c1.addEventListener('click', event), c2.addEventListener('click', event), c3.addEventListener('click', event), c4.addEventListener('click', event), c5.addEventListener('click', event), c6.addEventListener('click', event), c7.addEventListener('click', event), c8.addEventListener('click', event)
}

console.log(c0)
//Switches between X and O and draws the player symbol, and blocks square
function event(event) {

    if (event.target.innerHTML) {
        console.log('Square is taken')
    } else {
        event.target.innerHTML = currentPlayer
        winningLine()
        if (currentPlayer === playerX) {
            currentPlayer = playerO
        } else {
            currentPlayer = playerX
        }
    }
}
//Winning
function winningLine() {
    for (let winningArrays of winningconditons) {
        let firstCell = winningArrays[0].innerHTML
        let secondCell = winningArrays[1].innerHTML
        let thirdCell = winningArrays[2].innerHTML
        if (firstCell !== "") {
            if (firstCell === secondCell && secondCell === thirdCell) {
                alert('Winner')
            }
        }
    }
}


//How do I make this work for C0-C8, I know I could simple enter ever cell in but is there a simplified way?