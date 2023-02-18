
const game = new Game();


const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');



const startButton = document.querySelector('#start-screen');
startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    game.start();
})



document.addEventListener('keydown', (event) => {
    if(!game.playing) return;
    switch(event.key){

        case 'ArrowLeft':
            game.player.moveLeft();
            break;

        case 'ArrowRight':
            game.player.moveRight();
            break;

        case 'ArrowUp':
            game.player.moveUp();
            break;

        case 'ArrowDown':
            game.player.moveDown();
            break;
    }
})
