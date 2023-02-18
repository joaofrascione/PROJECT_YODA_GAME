class Game {
    constructor (){
        this.score = 0;
        this.time = 0;
        this.comets = [];
        this.deathStars = [];
        this.spaces = [];
        this.Player = null;
        this.playing = false;

    }

    start (){
    this.player = new Player ();
    this.comets.push(new Comet(50, 450));
    this.comets.push(new Comet(200, 450));
    this.comets.push(new Comet(350, 450));
    this.comets.push(new Comet(500, 450));
    this.comets.push(new Comet(650, 450));
    this.comets.push(new Comet(800, 450));
    this.comets.push(new Comet(950, 450));
    this.comets.push(new Comet(1100, 450));
    this.darth = new DarthVader();
    this.deathStars.push(new DeathStar(400, 180));
    this.deathStars.push(new DeathStar(190, 270));
    this.deathStars.push(new DeathStar(600, 270));
    this.deathStars.push(new DeathStar(800, 180));
    this.deathStars.push(new DeathStar(980, 270));
    this.deathStars.push(new DeathStar(1150, 180));
    this.deathStars.push(new DeathStar(20, 180));
    this.spaces.push(new Space(150, 20));
    this.spaces.push(new Space(900, 20));
    this.planet = new Planet();
    this.playing = true;
    }

}

// yoda - jogador
class Player{
    constructor (){
        this.width = 45;
        this.height = 30;
        this.x = 630;
        this.y = 560;
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
        div.src = "./yoda.png";
        this.element = div;
    }
    show(){
        gameScreen.appendChild(this.element);
    }

//CONTROLES SETA JOGADOR

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

    crashedWith(comet){
        const top = this.y;
        const bottom = this.y + this.height;
        const left = this.x;
        const right = this.x + this.width;

        const obsTop = comet.y
        const obsBottom = comet.y + comet.height;
        const obsLeft = comet.x;
        const obsRight = comet.x + comet.width;

        const out = bottom < obsTop || top > obsBottom || left > obsRight || right < obsLeft;
        return !out; 

        const crash = this.player.crashedWith(this.obstacles[i]);
        if(crash){
            clearInterval(this.intervalId);
            this.playing = false;
        }

    
    }
}


//OBSTACULOS

//comets
class Comet {
    constructor(x,y){
        this.width = 50;
        this.height = 50;
        this.x = x
        this.y = y;
        this.speed = 6;
        this.element = null;
        this.createElement();
        this.show();

    }

    createElement(){
        const div = document.createElement('img');
        div.classList.add('comets');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./cometa.png";
        this.element = div;

    }
    show(){
        gameScreen.appendChild(this.element);

    }
}

//darthvader
class DarthVader {
    constructor(x){
        this.width = 100;
        this.height = 100;
        this.x = 600;
        this.y = 300;
        this.speed = 6;
        this.element = null;
        this.createElement();
        this.show();

    }

    createElement(){
        const div = document.createElement('img');
        div.classList.add('darth');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./Pixel-Anakin-Skywalker-Star-Wars-PNG.png";
        this.element = div;

    }
    show(){
        gameScreen.appendChild(this.element);

    }
}

//deathStars
class DeathStar {
    constructor(x,y){
        this.width = 70;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.speed = 6;
        this.element = null;
        this.createElement();
        this.show();

    }

    createElement(){
        const div = document.createElement('img');
        div.classList.add('deathStars');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./star.png";
        this.element = div;

    }
    show(){
        gameScreen.appendChild(this.element);

    }
}

//spaceships
class Space {
    constructor(x,y){
        this.width = 350;
        this.height = 150;
        this.x = x;
        this.y = y;
        this.speed = 6;
        this.element = null;
        this.createElement();
        this.show();

    }

    createElement(){
        const div = document.createElement('img');
        div.classList.add('spaces');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./star-removebg-preview.png";
        this.element = div;

    }
    show(){
        gameScreen.appendChild(this.element);

    }
}

//Planeta - objetivo final
class Planet {
    constructor(){
        this.width = 100;
        this.height = 40;
        this.x = 600;
        this.y = 0;
        this.speed = 6;
        this.element = null;
        this.createElement();
        this.show();

    }

    createElement(){
        const div = document.createElement('img');
        div.classList.add('planet');
        div.style.width = `${this.width}px`;
        div.style.height= `${this.height}px`;
        div.style.position = 'absolute';
        div.style.top = `${this.y}px`;
        div.style.left = `${this.x}px`;
        div.src = "./planet.png";
        this.element = div;

    }
    show(){
        gameScreen.appendChild(this.element);

    }
}