class Game {
  constructor() {
    this.score = 0;
    this.time = 0;
    this.comets = [];
    this.deathStars = [];
    this.spaces = [];
    this.darth = [];
    this.playing = false;
    this.player = null;
    this.frames = 0;
    this.intervalId = null;
  }

  start() {
    this.player = new Player();
    this.comets.push(new Comet(50, 470));
    this.comets.push(new Comet(200, 470));
    this.comets.push(new Comet(350, 470));
    this.comets.push(new Comet(500, 470));
    this.comets.push(new Comet(650, 470));
    this.comets.push(new Comet(800, 470));
    this.comets.push(new Comet(950, 470));
    this.comets.push(new Comet(1100, 470));
    this.darth = new DarthVader();
    this.deathStars.push(new DeathStar(400, 180));
    this.deathStars.push(new DeathStar(190, 270));
    this.deathStars.push(new DeathStar(600, 270));
    this.deathStars.push(new DeathStar(800, 180));
    this.deathStars.push(new DeathStar(980, 270));
    this.deathStars.push(new DeathStar(1150, 180));
    this.deathStars.push(new DeathStar(20, 180));
    this.spaces1 = new Space();
    this.spaces2 = new Space2();
    this.planet = new Planet();
    this.playing = true;
    this.intervalId = setInterval(this.updateObstacles, 20);
  }

  updateObstacles = () => {
    this.frames +=1
    this.countScore();
    const crashDarth = this.player.crashWith(this.darth);
    if (crashDarth) {
      this.playing = false;
      this.showGameOver();
      clearInterval(this.intervalId);
      console.log("bateu darth");
    }

    for (let i = 0; i < this.comets.length; i++) {
      const crash = this.player.crashWith(this.comets[i]);
      if (crash) {
        this.playing = false;
        clearInterval(this.intervalId);
        this.showGameOver();
        console.log("bateu cometa");
      }
    }

    for (let i = 0; i < this.deathStars.length; i++) {
      const crash2 = this.player.crashWith(this.deathStars[i]);
      if (crash2) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.showGameOver();
        console.log("bateu deathStars");
      }
    }

    for (let i = 0; i < this.spaces1.length; i++) {
      const crash3 = this.player.crashWith(this.spaces1[i]);
      if (crash3) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.showGameOver();
        console.log("bateu spaces1");
      }
    }

    for (let i = 0; i < this.spaces2.length; i++) {
      const crash4 = this.player.crashWith(this.spaces2[i]);
      if (crash4) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.showGameOver();
        console.log("bateu spaces2");
      }
    }

    const crashPlanet = this.player.crashWithPlanet(this.planet);
    if (crashPlanet) {
      this.playing = false;
      this.showGameWin();
      clearInterval(this.intervalId);
      console.log("bateu planeta");
    }
  }

  showGameOver(){
    document.querySelector('#game-over span').innerHTML = this.score;
    document.querySelector('#game-over').classList.remove('hidden');
  }

  showGameWin(){
    document.querySelector('#game-win span').innerHTML = this.score;
    document.querySelector('#game-win').classList.remove('hidden');
  }

 


  countScore(){
        this.score = Math.floor(this.frames / 30);
        document.querySelector('#score').innerHTML = this.score;
        document.querySelector('#score').classList.remove('hidden');
        
    }
}

// yoda - jogador
class Player {
  constructor() {
    this.width = 45;
    this.height = 30;
    this.x = 630;
    this.y = 560;
    this.speed = 20;
    this.element = null;
    this.createElement();
    this.show();
  }
  createElement() {
    const div = document.createElement("img");
    div.setAttribute("id", "player");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./yoda.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }

  //CONTROLES SETA JOGADOR

  moveLeft() {
    if (this.x <= 0) return;
    this.x -= this.speed;
    this.element.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + this.width >= gameScreen.offsetWidth) return;
    this.x += this.speed;
    this.element.style.left = `${this.x}px`;
  }

  moveUp() {
    if (this.y <= 0) return;
    this.y -= this.speed;
    this.element.style.top = `${this.y}px`;
  }

  moveDown() {
    if (this.y + this.height >= gameScreen.offsetHeight) return;
    this.y += this.speed;
    this.element.style.top = `${this.y}px`;
  }

  crashWith(element) {
    const obstacle = element.element.getBoundingClientRect();
    const top = this.y;
    const bottom = this.y + this.height;
    const left = this.x;
    const right = this.x + this.width;
    const obsTop = obstacle.top;
    const obsBottom = obstacle.bottom;
    const obsLeft = obstacle.left;
    const obsRight = obstacle.right;
    const out =
      bottom < obsTop || top > obsBottom || left > obsRight || right < obsLeft;
    console.log(out);
    return !out;
  }

  crashWithPlanet(element) {
    const obstacle = element.element.getBoundingClientRect();
    const top = this.y;
    const bottom = this.y + this.height;
    const left = this.x;
    const right = this.x + this.width;
    const obsTop = obstacle.top;
    const obsBottom = obstacle.bottom;
    const obsLeft = obstacle.left;
    const obsRight = obstacle.right;
    const out =
      bottom < obsTop || top > obsBottom || left > obsRight || right < obsLeft;
    console.log(out);
    return !out;
  }
}

//OBSTACULOS

//comets
class Comet {
  constructor(x, y) {
    this.width = 50;
    this.height = 35;
    this.x = x;
    this.y = y;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("comets");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./cometas_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//darthvader
class DarthVader {
  constructor(x) {
    this.width = 85;
    this.height = 45;
    this.x = 600;
    this.y = 350;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("darth");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./darth_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//deathStars
class DeathStar {
  constructor(x, y) {
    this.width = 42;
    this.height = 42;
    this.x = x;
    this.y = y;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("deathStars");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./star_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//spaceships
class Space {
  constructor(x) {
    this.width = 90;
    this.height = 50;
    this.x = 270;
    this.y = 70;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("spaces1");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./space_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}
class Space2 {
  constructor(x) {
    this.width = 90;
    this.height = 50;
    this.x = 1020;
    this.y = 70;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("spaces2");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./space_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//Planeta - objetivo final
class Planet {
  constructor() {
    this.width = 100;
    this.height = 40;
    this.x = 600;
    this.y = 0;
    this.speed = 6;
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const div = document.createElement("img");
    div.classList.add("planet");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.position = "absolute";
    div.style.top = `${this.y}px`;
    div.style.left = `${this.x}px`;
    div.src = "./planet.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}
