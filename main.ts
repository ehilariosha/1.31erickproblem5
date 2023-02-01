controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorRow > 0) {
        cursorRow += -1
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
function drawCursor (row: number, col: number, XOsprite: Sprite) {
    XOsprite.left = col * 34 + 38
    XOsprite.top = row * 34 + 18
}
function resetGame () {
    game.splash("Press A for new game")
    game.reset()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    newXOsprite.setFlag(SpriteFlag.Invisible, false)
    insertPlayerMove(cursorRow, cursorCol, XorOturn)
    if (isWinner(XorOturn)) {
        game.splash(XorOturn, "WINS!")
    }
    changePlayer()
    XOsprites.push(newXOsprite)
    newXOsprite = textsprite.create(XorOturn)
    newXOsprite.setMaxFontHeight(24)
    newXOsprite.setOutline(1, 13)
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorCol > 0) {
        cursorCol += -1
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorCol < 2) {
        cursorCol += 1
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
function drawGrid () {
    tiles.setCurrentTilemap(tilemap`level1`)
}
function cursorBlink () {
    if (cursorOnOrOff == 1) {
        newXOsprite.setFlag(SpriteFlag.Invisible, true)
        cursorOnOrOff = 0
    } else {
        newXOsprite.setFlag(SpriteFlag.Invisible, false)
        cursorOnOrOff = 1
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorRow < 2) {
        cursorRow += 1
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
function insertPlayerMove (row: number, col: number, player2: string) {
    grid[row][col] = player2
    for (let value of grid) {
        console.log(value)
    }
}
function changePlayer () {
    if (XorOturn == "X") {
        XorOturn = "O"
    } else {
        XorOturn = "X"
    }
}
function isWinner (player2: string) {
    for (let index = 0; index <= 2; index++) {
        winningRow = grid[index]
        if (winningRow[0] == player2) {
            if (winningRow[0] == winningRow[1] && winningRow[1] == winningRow[2]) {
                return true
            }
        }
    }
    for (let index = 0; index <= 2; index++) {
        winningCol = [grid[0][index], grid[1][index], grid[2][index]]
        if (winningCol[0] == player2) {
            if (winningCol[0] == winningCol[1] && winningCol[1] == winningCol[2]) {
                return true
            }
        }
    }
    winningDiagonal = [grid[0][0], grid[1][1], grid[2][2]]
    if (winningDiagonal[0] == player2) {
        if (winningDiagonal[0] == winningDiagonal[1] && winningDiagonal[1] == winningDiagonal[2]) {
            return true
        }
    }
    winningDiagonal = [grid[0][2], grid[1][1], grid[2][0]]
    if (winningDiagonal[0] == player2) {
        if (winningDiagonal[0] == winningDiagonal[1] && winningDiagonal[1] == winningDiagonal[2]) {
            return true
        }
    }
    return false
}
let winningDiagonal: string[] = []
let winningCol: string[] = []
let winningRow: string[] = []
let newXOsprite: TextSprite = null
let cursorOnOrOff = 0
let cursorCol = 0
let cursorRow = 0
let XorOturn = ""
let XOsprites: TextSprite[] = []
let grid: string[][] = []
grid = [["", "", ""], ["", "", ""], ["", "", ""]]
console.log(grid)
XOsprites = [textsprite.create("")]
XOsprites.pop()
drawGrid()
XorOturn = "X"
cursorRow = 0
cursorCol = 0
cursorOnOrOff = 1
newXOsprite = textsprite.create(XorOturn)
newXOsprite.setMaxFontHeight(24)
newXOsprite.setOutline(1, 13)
drawCursor(cursorRow, cursorCol, newXOsprite)
game.onUpdateInterval(200, function () {
    cursorBlink()
})
