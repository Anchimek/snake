const grid = document.querySelector('.grid')
const scores = document.getElementById('score')
const scoreBoard = document.getElementById('score-board')
const startBtn = document.getElementById('start')
const bestScoreBoard = document.getElementById('best')
const width = 20
let score
let squares = []
let bestScore = 0
let currentSnake = [85, 86, 87]
let snakeHead 
let snakeTail 
let move
let apple = 0
let speed 
let moving
startBtn.addEventListener('click', startGame)

function createGameBoard() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        if(i <= 19 || i % width === 0 || i > 380 || i % width === 19) square.classList.add('fire')
        squares.push(square)
        grid.appendChild(square)
    }
} createGameBoard()

function startGame() {
    bestScore = JSON.parse(localStorage.getItem('Score'))
    bestScoreBoard.textContent  = bestScore

    //default values
    currentSnake.forEach(i => squares[i].classList.remove('snake'))
    currentSnake.forEach(i => squares[i].classList.remove('died'))
    currentSnake = [85, 86, 87]
    move = 1
    clearInterval(moving)
    speed = 600
    moving = setInterval(snakeMove, speed)
    score = 0
    scores.textContent = 0
    squares[apple].classList.remove('apple')
    addApple()
    
    //create a default snake
    currentSnake.forEach(i => squares[i].classList.add('snake'))
    
    function snakeMove() {
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowDown') {if(move !== -width) move = width}
            else if (e.code === 'ArrowUp') {if(move !== width) move = -width}
            else if (e.code === 'ArrowRight'){if(move !== -1) move = 1}
            else if (e.code === 'ArrowLeft'){if(move !== 1) move = -1}
        })
    
        snakeTail = currentSnake[0]
        squares[snakeTail].classList.remove('snake')
        currentSnake.shift()
        
        snakeHead = currentSnake.at(-1) + move
        currentSnake.push(snakeHead)
        squares[snakeHead].classList.add('snake')
    
        //eaten apple
        if(snakeHead === apple) appleEat()
    
        //wall or snake body
        if(snakeHead <= 19 || snakeHead % width === 0 || snakeHead > 380 || snakeHead % width === 19 || squares[snakeHead + (move)].className.includes('snake')) gameOver()
            
    }
    
    
    function addApple() {
        do apple = Math.floor(Math.random() * width*width)
        while (squares[apple].className.includes('snake') || squares[apple].className.includes('fire')) 
    
        squares[apple].classList.add('apple')
    }
    
    
    function appleEat() {
        score++
        scores.textContent = score
    
        clearInterval(moving)
        speed *= 0.9
        moving = setInterval(snakeMove, speed)
    
        currentSnake.unshift(snakeTail)
        squares[snakeTail].classList.add('snake')
    
        squares[apple].classList.remove('apple')
        addApple()
    }
    
    function gameOver() {
        clearInterval(moving)

        if(score > bestScore) {
            bestScore = score
            localStorage.setItem('Score', JSON.stringify(bestScore))
        }

        setTimeout(() => {
            currentSnake.forEach(i => squares[i].classList.add('died'))
        }, 500)
        
        setTimeout(() => {
            scores.textContent += ` - Game over! `
        }, 1500);
    }
    
}




