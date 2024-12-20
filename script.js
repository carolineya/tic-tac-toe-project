let xMarker = true;
let win = false;

const gameBoard = {
    topLeft: {marker: "", open: true, position: [0, 0]},
    topMid: {marker: "", open: true, position: [0, 1]},
    topRight: {marker: "", open: true, position: [0, 2]},

    midLeft: {marker: "", open: true, position: [1, 0]},
    midMid: {marker: "", open: true, position: [1, 1]},
    midRight: {marker: "", open: true, position: [1, 2]},

    bottomLeft: {marker: "", open: true, position: [2, 0]},
    bottomMid: {marker: "", open: true, position: [2, 1]},
    bottomRight: {marker: "", open: true, position: [2, 2]},
}

const startGameDialog = document.getElementById("start-game-dialog")
const newGameBtn = document.getElementById("start-new-game-btn")
const playerDialog = document.getElementById("player-info-dialog")
const winnerDialog = document.getElementById("winner-dialog")
const winnerNewGameBtn = document.getElementById("winner-new-game-btn")
const drawDialog = document.getElementById("draw-dialog")
const drawNewGameBtn = document.getElementById("draw-new-game-btn")
const playerOneInput = document.getElementById("player1-name")
const playerTwoInput = document.getElementById("player2-name")

let playerOne = createUser("Player 1")
let playerTwo = createUser("Player 2")

window.onload = function () {
    startGameDialog.showModal();
    };

newGameBtn.addEventListener("click", () => {
    playerDialog.showModal();
  });

winnerNewGameBtn.addEventListener("click", () => {
    playerDialog.showModal();
    clearBoardPlayers()
});

drawNewGameBtn.addEventListener("click", () => {
    playerDialog.showModal();
    clearBoardPlayers()
});

playerDialog.addEventListener("submit", function() {
    let playerOneName = playerOneInput.value
    let playerTwoName = playerTwoInput.value
    if (playerOneName) {
        playerOne = createUser(playerOneName)
    } 
    if (playerTwoName) {
        playerTwo = createUser(playerTwoName)
    }
})

function createUser (name) {
    const winStatement = `&#x1F3C6 ${name} wins! &#x1F3C6`
    return { name, winStatement };
  }

function recordMarker(id, xMarker) {
    if (xMarker) {
        gameBoard[id].marker = "x"
    } else {
        gameBoard[id].marker = "o"
    }
    gameBoard[id].open = false
}

function placeMarker(id) {
    if (gameBoard[id].open) {
        let element = document.getElementById(id)
        if (xMarker) {
            element.innerHTML = "&#10060"//"&#215"
        } else {
            element.innerHTML = "&#11093;"
        }
        recordMarker(id, xMarker)
        checkForWin()
        xMarker = !xMarker
    }
}

function checkForWin() {
    let xCount = 0
    let oCount = 0
    for (let key in gameBoard) {
        if (gameBoard[key].marker === "x") {
            xCount++
        } else if (gameBoard[key].marker === "o") {
            oCount++
        }
    }
    if (xCount >= 3) {
        findDiagonal(searchForThree("x"), playerOne)
        findRow(searchForThree("x"), playerOne)
        findColumn(searchForThree("x"), playerOne)
    }
    if (oCount >= 3) {
        findDiagonal(searchForThree("o"), playerTwo)
        findRow(searchForThree("o"), playerTwo)
        findColumn(searchForThree("o"), playerTwo)
    }
    if (xCount + oCount === 9 & win === false) {
        endGameMessage(null, win)
    }
}

function searchForThree(marker) {
    let searchResults = []

    for (let key in gameBoard) {
        if (gameBoard[key].marker === marker) {
            searchResults.push(gameBoard[key])
        }
    }
    return searchResults
}

function findDiagonal(searchResults, player) {
    let diagonalFalling = searchResults.filter(obj => {
        return obj.position[0] === obj.position[1]})
    let diagonalRising = searchResults.filter(obj => {
        return obj.position[0] + obj.position[1] === 2
    })
    if (diagonalFalling.length === 3 | diagonalRising.length === 3) {
        win = true
        endGameMessage(player, win)
    }
}

function findRow(searchResults, player) {
    for (let i = 0; i <= 2; i++) {
        rowMarkers = searchResults.filter(obj => {
            return obj.position[0] === i})
        if (rowMarkers.length === 3) {
            win = true
            endGameMessage(player, win)
        }     
    }
}

function findColumn(searchResults, player) {
    for (let i = 0; i <= 2; i++) {
        columnMarkers = searchResults.filter(obj => {
            return obj.position[1] === i})
        if (columnMarkers.length === 3) {
            win = true
            endGameMessage(player, win)
        }     
    }
}

function endGameMessage(player, win) {
    if (win) {
        const gameResultEl = document.getElementById("winner-result")
        gameResultEl.innerHTML = player.winStatement
        winnerDialog.showModal()
    } else {
        const gameResultEl = document.getElementById("draw-result")
        gameResultEl.innerHTML = "It's a draw!"
        drawDialog.showModal()
    }
}

function clearBoardPlayers() {
    for (let key in gameBoard) {
        gameBoard[key].marker = ""
        gameBoard[key].open = true
        let element = document.getElementById(key)
        element.innerHTML = ""
    }
    win = false
    playerOneInput.value = ""
    playerTwoInput.value = ""
    xMarker = true
}




  



