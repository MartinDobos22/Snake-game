
// event listenery 

document.addEventListener("keydown", keyPush);

/**
 * CANVAS 
 */

//vytiahneme si do premennej canvas element canvas
const canvas = document.querySelector("canvas");
//bude to kresliť pole do 2d 
const ctx = canvas.getContext("2d");

const title = document.querySelector("h1");

// game 
let gameIsRunning = true;
const fps = 10;

//veľkosť postavičky 
const tileSize = 50;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;


/**
 * PLAYER  
 */
let snakeSpeed = tileSize;

//pozícia postavičky na začiatku 
let snakePosX = 0;

 //vypočíta to tak aby bola postavička presne v strede, polovica herného pola - polovica postavičky a zapíše hodnotu na os Y 
let snakePosY = canvas.height / 2;


let velocityX = 1;
let velocityY = 0;


let tail = [];

let snakeLength = 1; 

//food
let foodPosX = 0;
let foodPosY = 0;







/**
 * GAME FUNCTIONALITY FUNCTION 
 */

function gameLoop(){
    if( gameIsRunning ) {
            
    drawStuff();
    moveStuff();
    

    }


   // requestAnimationFrame(gameLoop);
   setTimeout(gameLoop, 1000 / fps);
}

resetFood();
gameLoop();







/**
 * MOVING FUNCTION
 */

function moveStuff(){

    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    //wall collision
    if( snakePosX > canvas.width - tileSize){
        snakePosX = 0;
    }

    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }

    if(snakePosY > canvas.height - tileSize){
        snakePosY= 0;
    }

    if(snakePosY < 0) {
        snakePosY = canvas.height;
    }


    //game over 
    tail.forEach ((snakePart) => {
        if(snakePosX === snakePart.x && snakePosY === snakePart.y ){
          gameOver();
        }
    });

    //tail
    tail.push({  x: snakePosX, y: snakePosY });

    // forget earliest parts of snake 
    tail = tail.slice(-1 * snakeLength);

    //food collision 
    if(snakePosX === foodPosX && snakePosY === foodPosY ){
        title.textContent = ++score;
        snakeLength++;
        resetFood();
    }


}





/**
 * DRAWING FUNCTION 
 */

function drawStuff(){

    //background 
    rectangle("#ffbf00",0, 0, canvas.width, canvas.height );

    //grid
    drawGrid();
    
    //food
    rectangle("#00bfff", foodPosX, foodPosY, tileSize,tileSize );

    //tail
    tail.forEach(snakePart => 
        rectangle("#555", snakePart.x, snakePart.y, tileSize, tileSize)
        );

    //snake
    rectangle("black",snakePosX, snakePosY, tileSize, tileSize);

}




//keyboard restarts game 
function gameOver() {
      title.innerHTML = "<strong> ${score} </strong>";
    gameIsRunning = false;
  }



// randomize food position
function resetFood() { 
    
    if(snakeLength === tileCountX * tileCountY){
        gameOver();
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    //dont spawn food on snakes head 
    if(foodPosX === snakePosX && foodPosY === snakePosY){
        resetFood();f
    }

    //donst spawn food on any snake parts 
    if (tail.some(
         (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY)){
            resetFood();
         }
        
    }
 





function drawGrid(){
    for(let i = 0; i < tileCountX; i++){
        for(let j = 0; j <tileCountY; j++){
        rectangle ("#fff", tileSize*i, tileSize * j, tileSize -1, tileSize -1);
       }
    }

}


/**
 * DRAW RECTANGLE 
 */

function rectangle(color, x, y, width, height){

    //dizaj canvasu 
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width,height);

}

function keyPush(event){
    
    //alert(event.key);



    switch(event.key){

        case "ArrowLeft":
            if(velocityX !== 1){
            velocityX = -1;
            velocityY = 0;
            }
            break;
            
        case "ArrowUp": 
            if(velocityY !== 1){
            velocityX = 0;
            velocityY = -1;
            }
            break;
            
        case "ArrowRight":
            if( velocityX!== -1){
            velocityX = 1;
            velocityY = 0;
            }
            break;

        
        case "ArrowDown":
            if (velocityY !== -1){ 
            velocityX = 0;
            velocityY = 1;
            }
            break;
            default:
                if(!gameIsRunning) localtion.reload();
                break;
    }

    
/*
    // multiple switch event 
    //hýbanie po hracej ploche 

    switch(event.key){  

        case "ArrowLeft": case "a":
            snakePosX -= snakeSpeed;
            break;
            
        case "ArrowUp": case "s":
            snakePosY -= snakeSpeed;
            break;
            
        case "ArrowRight": case "d":
            snakePosX += snakeSpeed;
            break;
            
        case "ArrowDown": case "s":
            snakePosY += snakeSpeed;
            break;
    }
    */
    
}






