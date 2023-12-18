const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');

const upKey = document.querySelector('.up');
const downKey = document.querySelector('.down');
const leftKey = document.querySelector('.left');
const rightKey = document.querySelector('.right');
const startKey = document.querySelector('.start');

const canvasWidth = canvas.width; 
const canvasHeight = canvas.height; 

const snakeWidth = canvasWidth / 20;
const snakeHeight = canvasHeight / 20;

let UNIT = canvasHeight / 20; // UNIT = 15 

let xAxis = UNIT;
let yAxis = 0;

let yDirection = 0;
let xDirection = UNIT;

let gameStart = false;

let snake = [
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0}
];

startKey.addEventListener('click',()=>{
    gameStart = true;
    startGame();
});

upKey.addEventListener('click',()=>{
    xDirection = 0 ;
    yDirection = -UNIT;
})
downKey.addEventListener('click',()=>{
    xDirection = 0;
    yDirection = UNIT;
})
leftKey.addEventListener('click',()=>{
    xDirection = -UNIT;
    yDirection = 0;
})
rightKey.addEventListener('click',()=>{
    xDirection = UNIT;
    yDirection = 0;
})

resetBoard();

function drawSnake(){
    snake.forEach((snakeBody)=>{
        context.fillStyle = "red";
        context.fillRect(snakeBody.x,snakeBody.y,UNIT,UNIT);
    })
}

function resetBoard(){
    context.fillStyle = "#56A3A6";
    context.fillRect(0,0,500,500);
}

function moveSnake(){
    snakeHead = {
        x:snake[snake.length-1].x+xDirection,
        y:snake[snake.length-1].y+yDirection
    }
    snake.push(snakeHead);
    snake.shift();
}

function drawSnakeRepeatedly(){
    if(gameStart){
        setTimeout(()=>{
            resetBoard();
            gameOver();
            drawSnake();
            moveSnake();
            drawSnakeRepeatedly();
        },200);
    }
}
function gameOver(){
    if( snake[snake.length-1].x>=canvasWidth ||
        snake[snake.length-1].x<0 ||
        snake[snake.length-1].y>=canvasHeight ||
        snake[snake.length-1].y<0 ){
            gameStart = false;
        }
}

function startGame(){
    drawSnake();
    drawSnakeRepeatedly();
}
