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


let foodX,foodY;

let reset = true;

let snake = [ 
    {x:-15,y:-15},
    {x:-15,y:-15},
    {x:-15,y:-15},
    {x:-15,y:-15},
    {x:-15,y:-15},
    {x:canvasWidth/2,y:canvasHeight/2}
];

startKey.addEventListener('click',()=>{
    if(!gameStart){
        snake = [ 
            {x:-15,y:-15},
            {x:-15,y:-15},
            {x:-15,y:-15},
            {x:-15,y:-15},
            {x:-15,y:-15},
            {x:canvasWidth/2,y:canvasHeight/2}
        ];
        reset = true;
        gameStart = true;
        resetBoard();
        startGame();
    }
});

upKey.addEventListener('click',()=>{
    if(!gameStart){
        gameStart = true;
        startGame();
    }
    if(yDirection != UNIT){
        xDirection = 0 ;
        yDirection = -UNIT;
    }
})
downKey.addEventListener('click',()=>{
    if(!gameStart){
        gameStart = true;
        startGame();
    }
    if(yDirection != -UNIT){
        xDirection = 0;
        yDirection = UNIT;
    }
})
leftKey.addEventListener('click',()=>{
    if(!gameStart){
        gameStart = true;
        startGame();
    }
    if(xDirection != UNIT){
        xDirection = -UNIT;
        yDirection = 0;
    }
})
rightKey.addEventListener('click',()=>{
    if(!gameStart){
        gameStart = true;
        startGame();
    }
    if(xDirection != -UNIT){
        xDirection = UNIT;
        yDirection = 0;
    }
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
    let snakeHead = {
        x:snake[snake.length-1].x+xDirection,
        y:snake[snake.length-1].y+yDirection
    }
    snake.push(snakeHead);
    snake.shift();
}

function drawSnakeRepeatedly(){
    gameOverWhenSnakeTouchWall();
    if(gameStart){
        setTimeout(()=>{
            if(reset){
                resetBoard();
                moveSnake();
                gameOverWhenSnakeTouchItsBody();
                growSnakeWhenEatFood();
                displayFood(foodX,foodY);
                drawSnake();
                drawSnakeRepeatedly();
                if(!reset){
                    gameOver();
            }
            }
        },200);
    }
}
function gameOverWhenSnakeTouchWall(){
    if( snake[snake.length-1].x>=canvasWidth ||
        snake[snake.length-1].x<0 ||
        snake[snake.length-1].y>=canvasHeight ||
        snake[snake.length-1].y<0 ){
           gameOver();
        }
}

function startGame(){
    drawSnake();
    createFood();
    displayFood();
    drawSnakeRepeatedly();
}

function createFood(){
    foodX = Math.floor(Math.random()*(canvasWidth/15))*(canvasWidth/20);
    foodY = Math.floor(Math.random()*(canvasWidth/15))*(canvasWidth/20);
}   

function displayFood(foodXDir,foodYDir){
    context.fillStyle = "#001242";
    context.fillRect(foodXDir,foodYDir,UNIT,UNIT);
};

function growSnakeWhenEatFood(){
    if(foodX==snake[snake.length-1].x && foodY==snake[snake.length-1].y ){
        snake.unshift({x:foodX,y:foodY});
        createFood();
        displayFood();
    }
}

function gameOverWhenSnakeTouchItsBody(){
    snake.forEach((snakeBody)=>{
        if( snakeBody != snake[snake.length-1]){
            if(
                snake[snake.length-1].x == snakeBody.x &&
                snake[snake.length-1].y == snakeBody.y
                ){
                    gameOver();
            }
        }
    })
}

function gameOver(){
    reset = false;
    gameStart = false;
    resetBoard();
    context.fillStyle = "black";
    context.font = "3rem serif";
    let fontSize = 40;
    let x = (canvas.width - context.measureText("Game Over").width) / 2;
    let y = (canvas.height + fontSize) / 2;
    context.fillText("Game Over",x,y); 
}