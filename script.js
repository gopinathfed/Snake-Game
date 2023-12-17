const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width; 
const canvasHeight = canvas.height; 

const snakeWidth = canvasWidth / 20;
const snakeHeight = canvasHeight / 20;

let xAxis = 0;
let yAxis = 0;

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
        xAxis+=20;
        yAxis+=0;
        drawSnakeRepeatedly();
    },300);
}
drawSnakeRepeatedly();