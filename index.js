class Game {
    constructor (){
        this.score = 0;
        this.time = 0;
        this.obstacles = [];
        this.Player = null;
        this.playing = false;

    }
}

class Player{
    constructor (){
        this.width = 150;
        this.height = 150;
        this.x = 630;
        this.y = 550;
        this.speed = 20;
        this.element = null;
        this.createElement();
        this.show();

    }
    createElement(){
        const div = document.createElement('img');
        div.setAttribute('id', 'player');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./db3fbb4c72d5ef7.png"
        this.element = div;
    }
    show(){
        gameScreen.appendChild(this.element);
    }

//CONTROLES SETA

    moveLeft(){
        if(this.x <= 0) return;
        this.x -= this.speed;
        this.element.style.left =`${this.x}px`;

    }
    
    moveRight(){ 
        if(this.x + this.width >= gameScreen.offsetWidth) return;
        this.x += this.speed;
        this.element.style.left =`${this.x}px`;
    }

    moveUp(){ 
        if(this.y <= 0) return;
        this.y -= this.speed;
        this.element.style.top =`${this.y}px`
    }

    moveDown(){ 
        if(this.y + this.height >= gameScreen.offsetHeight) return;
        this.y += this.speed;
        this.element.style.top =`${this.y}px`;
    }
}


//OBSTACULOS

