const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');

const upKey = document.querySelector('.up');
const downKey = document.querySelector('.down');
const leftKey = document.querySelector('.left');
const rightKey = document.querySelector('.right');

const canvasWidth = canvas.width; 
const canvasHeight = canvas.height; 

const snakeWidth = canvasWidth / 20;
const snakeHeight = canvasHeight / 20;

let UNIT = canvasHeight / 20; // UNIT = 15 

let xAxis = UNIT;
let yAxis = 0;

let y = 0;
let x = 0;

upKey.addEventListener('click',()=>{
    x = 0 ;
    y = -UNIT;
})
downKey.addEventListener('click',()=>{
    x = 0;
    y = UNIT;
})
leftKey.addEventListener('click',()=>{
    x = -UNIT;
    y = 0;
})
rightKey.addEventListener('click',()=>{
    x = UNIT;
    y = 0;
})

resetBoard();

function drawSnake(getXAxis,getYAxis){
    context.fillStyle = "#DB504A";
    context.fillRect(getXAxis,getYAxis,snakeWidth,snakeHeight);
}

function resetBoard(){
    context.fillStyle = "#56A3A6";
    context.fillRect(0,0,500,500);
}

function drawSnakeRepeatedly(){
    setTimeout(()=>{
        resetBoard();
        drawSnake(xAxis,yAxis);
        xAxis+=x;
        yAxis+=y;
        drawSnakeRepeatedly();
    },200);
}

drawSnakeRepeatedly();
