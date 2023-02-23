class Game {
  constructor() {
    this.score = 0;
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
    this.spaces1 = new Space1();
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
    }

    const crashSpace1 = this.player.crashWith(this.spaces1);
    if (crashSpace1) {
      this.playing = false;
      this.showGameOver();
      clearInterval(this.intervalId);
    }

    const crashSpace2 = this.player.crashWith(this.spaces2);
    if (crashSpace2) {
      this.playing = false;
      this.showGameOver();
      clearInterval(this.intervalId);
    }

    for (let i = 0; i < this.comets.length; i++) {
      const crash = this.player.crashWith(this.comets[i]);
      if (crash) {
        this.playing = false;
        clearInterval(this.intervalId);
        this.showGameOver();
      }
    }

    for (let i = 0; i < this.deathStars.length; i++) {
      const crash2 = this.player.crashWith(this.deathStars[i]);
      if (crash2) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.showGameOver();
      }
    }

    const crashPlanet = this.player.crashWithPlanet(this.planet);
    if (crashPlanet) {
      this.playing = false;
      this.showGameWin();
      clearInterval(this.intervalId);
    }
  }

  //GAME OVER TELA
  showGameOver(){
    document.querySelector('#game-over span').innerHTML = this.score;
    document.querySelector('#game-over').classList.remove('hidden');
  }

  //GAME WIN TELA
  showGameWin(){
    document.querySelector('#game-win span').innerHTML = this.score;
    document.querySelector('#game-win').classList.remove('hidden');
  }

 
//CONTADOR SEGUNDOS
  countScore(){
        this.score = Math.floor(this.frames / 50);
        document.querySelector('#score').innerHTML = this.score;
        document.querySelector('#score').classList.remove('hidden');
        
    }
}

// CLASSE YODA - JOGADOR
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
    div.src = "./src/yoda.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }

  //CONTROLES SETA DO JOGADOR

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

  //REFERÊNCIA PARA COLISÃO OBSTACULOS
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

   //REFERÊNCIA PARA COLISÃO PLANETA TERRA
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

//cometas
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
    div.src = "./src/cometas_ajustado.png";
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
    div.src = "./src/darth_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//estrelas da morte
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
    div.src = "./src/star_ajustado.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}

//espaçonaves
class Space1 {
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
    div.src = "./src/space_ajustado.png";
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
    div.src = "./src/space_ajustado.png";
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
    div.src = "./src/planet.png";
    this.element = div;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
}
