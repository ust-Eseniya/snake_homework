let inputDirection = {x:0, y:0};
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x: 5, y: 5}];
let food = {x: 8, y: 8};
let highScore = localStorage.getItem("high-score") || 0;


const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
highScoreElement.innerText = `Рекорд: ${highScore}`;

function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime
    gameEngine();
}

class Position {
function isCollide(snake){


    //Столкновение змейки со своим телом
    for(let i = 1; i < snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
             }
        }
    // Столкновение змейки с границой игрового поля
        if(snake[0].x > 10 || snake[0].x <= 0 || snake[0].y > 10 || snake[0].y < 0){
            return true;
    }
}

// Позиции еды от 1 до 10
 const updateFoodPosition = () => {
    food.x = Math.floor(Math.random() * 10) + 1;
    food.y = Math.floor(Math.random() * 10) + 1;
}
}

function gameEngine(){
    //Обновление масивов змеи и еды
    if(isCollide(snakeArray)){
        inputDirection = {x:0, y:0};
        alert("Игра Окончена! Нажмите ОК чтобы начать заново.");
        snakeArray = [{x:5, y:5}];
    
    }

    //Поедание еды змейкой, увеличение очков, появление еды в новом месте
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
       snakeArray.unshift({x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y});
       
       score++
       scoreElement.innerText = `Очки: ${score}`;
        if (highScore < score) {
        highScoreElement.innerText = `Рекорд: ${score}`;
        localStorage.setItem("high-score", score);
        }
        updateFoodPosition()
    }

    // получение большего кол-во очков из localStorage

        let highScore = localStorage.getItem("high-score") || 0;
        highScoreElement.innerText = `Рекорд: ${highScore}`;


    // Движение змейки
    for(let i = snakeArray.length -2; i >= 0; i--){
        snakeArray[i + 1] = {...snakeArray[i]}
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    //Отображение змейки
    playground.innerHTML = "";
    snakeArray.forEach((e, index) =>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;
       playground.appendChild(snakeElement);

       if(index === 0){
            snakeElement.classList.add('head');
       }else{
             snakeElement.classList.add('snake');
       }
    });

    // Отображение еды
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playground.appendChild(foodElement);
}
window.requestAnimationFrame(main);

// Управление игры
window.addEventListener('keydown', (e) => {
    // console.log(e);
    inputDirection = {x:0, y:1} // Старт игры
    switch(e.key){
        case "ArrowUp":
            // console.log('ArrowUp');
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            // console.log('ArrowDown');
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            // console.log('ArrowLeft');
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            // console.log('ArrowRight');
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
    }
})
