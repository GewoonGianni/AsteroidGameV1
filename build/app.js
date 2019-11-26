class GameEntity {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.loadImage(imgUrl);
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
    getYpos() {
        return this.yPos;
    }
    getXpos() {
        return this.xPos;
    }
    getIMGheight() {
        return this.img.height;
    }
    getIMGwidth() {
        return this.img.width;
    }
}
class Asteroid extends GameEntity {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        super(imgUrl, xPos, yPos, xVel, yVel);
    }
    move(canvas) {
        if ((this.xPos + this.img.width / 2 > canvas.width) ||
            (this.xPos - this.img.width / 2 < 0)) {
            this.xVel = -this.xVel;
        }
        if (this.yPos + this.img.height / 2 > canvas.height ||
            this.yPos - this.img.height / 2 < 0) {
            this.yVel = -this.yVel;
        }
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
    draw(ctx) {
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentscreen.drawScreen();
            if (this.keyboardlistener.isKeyDown(KeyboardListener.KEY_S)) {
                this.currentscreen = this.levelscreen;
            }
            else if (this.keyboardlistener.isKeyDown(KeyboardListener.KEY_ESC) || this.levelscreen.getLifes() == 0) {
                this.currentscreen = this.highscorescreen;
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        this.startscreen = new Startscreen(this.canvas, this.ctx);
        this.keyboardlistener = new KeyboardListener();
        this.levelscreen = new levelscreen(this.canvas, this.ctx, 10, 4100, './assets/images/health.png');
        this.highscorescreen = new Highscorescreen(this.canvas, this.ctx);
        this.currentscreen = this.startscreen;
        this.loop();
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadImage(source, callback) {
        const imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Agency_Bold`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Highscorescreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.player = "Player one";
        this.score = 400;
        this.highscores = [
            {
                playerName: "Loek",
                score: 40000,
            },
            {
                playerName: "Daan",
                score: 34000,
            },
            {
                playerName: "Rimmert",
                score: 200,
            },
        ];
    }
    drawScreen() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        this.writeTextToCanvas(`${this.player} score is ${this.score}`, 80, x, y - 100);
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);
        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`;
            this.writeTextToCanvas(text, 20, x, y);
        }
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_ESC = 27;
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_S = 83;
class levelscreen extends GameScreen {
    constructor(canvas, ctx, lifes, score, imageURL) {
        super(canvas, ctx);
        this.lifes = lifes;
        this.scoreAmount = score;
        this.source = imageURL;
        this.loadImage(imageURL);
        this.loadBarImage('./assets/images/healthbar.png');
        this.ship = new Ship("./assets/images/avengerShip.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, new KeyboardListener());
        const asteroidFilenames = [
            "./assets/images/asteroids/asteroid1.png",
            "./assets/images/asteroids/asteroid2.png",
            "./assets/images/asteroids/asteroid3.png",
            "./assets/images/asteroids/astroid1.png",
            "./assets/images/asteroids/astroid2.png",
        ];
        this.asteroids = [];
        for (let i = 0; i < this.randomNumber(5, 20); i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length);
            this.asteroids.push(new Asteroid(asteroidFilenames[randomIndex], this.randomNumber(50, this.canvas.width - 121), this.randomNumber(50, this.canvas.height - 99), this.randomNumber(1, 10), this.randomNumber(1, 10)));
        }
        this.hit = false;
    }
    getLifes() {
        return this.lifes;
    }
    drawScreen() {
        let hitCheckArray = [];
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
            if (this.ship.isColliding(asteroid) == true && this.hit == false) {
                this.lifes -= 1;
                this.hit = true;
            }
            if (this.ship.isColliding(asteroid) == true) {
                hitCheckArray.push(1);
            }
        });
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
        if (this.hit == true) {
            this.ship.fire(this.ctx);
        }
        if (hitCheckArray[0] !== 1) {
            this.hit = false;
        }
        this.drawLifes();
        this.drawtext();
    }
    drawtext() {
        this.writeTextToCanvas(`Score: ${this.scoreAmount}`, 20, window.innerWidth / 20 * 19, window.innerHeight / 20, "right", 'white');
    }
    drawLifes() {
        this.ctx.drawImage(this.barimg, window.innerWidth / 20, window.innerHeight / 20);
        for (let i = 0; i < this.lifes; i++) {
            this.ctx.drawImage(this.img, window.innerWidth / 20 + 3 + 20 * i, window.innerHeight / 20 + 3);
        }
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
    loadBarImage(source) {
        this.barimg = new Image();
        this.barimg.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Ship extends GameEntity {
    constructor(imgURL, xPos, yPos, xVel, yVel, keyboardListener) {
        super(imgURL, xPos, yPos, xVel, yVel);
        this.rotation = 0;
        this.KeyboardListener = keyboardListener;
        this.loadFireImage('./assets/images/explosion.png');
    }
    move(canvas) {
        if (this.KeyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.rotation += this.degreeToRadion(3);
        }
        if (this.KeyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
            this.rotation -= this.degreeToRadion(3);
        }
        if (this.KeyboardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPos -= Math.cos(this.rotation) * this.yVel;
            this.xPos += Math.sin(this.rotation) * this.xVel;
            if (this.xPos <= 0) {
                this.xPos = 1;
            }
            if (this.xPos >= window.innerWidth - this.img.width) {
                this.xPos = window.innerWidth - 1 - this.img.width;
            }
            if (this.yPos <= 0) {
                this.yPos = 1;
            }
            if (this.yPos >= window.innerHeight - this.img.height) {
                this.yPos = window.innerHeight - 1 - this.img.height;
            }
        }
    }
    draw(ctx) {
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));
            ctx.drawImage(this.img, this.xPos, this.yPos);
            ctx.restore();
        }
    }
    isColliding(GameEntity) {
        if ((this.yPos + this.img.height > GameEntity.getYpos())
            && (this.yPos < (GameEntity.getYpos() + GameEntity.getIMGheight()))
            && ((this.xPos + this.img.width) > GameEntity.getXpos())
            && (this.xPos < (GameEntity.getXpos() + GameEntity.getIMGwidth()))) {
            console.log('geraakt a neef pas op matje');
            return true;
        }
        return false;
    }
    degreeToRadion(degree) {
        return Math.PI / 180 * degree;
    }
    fire(ctx) {
        ctx.drawImage(this.fireimg, this.xPos + this.img.width / 2 - 47.5, this.yPos + this.img.height / 2 - 47.5);
    }
    loadFireImage(source) {
        this.fireimg = new Image();
        this.fireimg.src = source;
    }
}
class Startscreen extends GameScreen {
    constructor(canvas, ctx) {
        super(canvas, ctx);
    }
    writeAsteroidImageToStartScreen(img) {
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 5 * 2 + img.height / 2;
        this.ctx.drawImage(img, x, y);
    }
    loadImage(source) {
        const imageElement = new Image();
        imageElement.src = source;
        return imageElement;
    }
    drawScreen() {
        this.ctx.drawImage(this.loadImage('./assets/images/SC.png'), window.innerWidth / 3 * 2 - 175, window.innerHeight / 3 - 175);
        this.writeTextToCanvas('THE FINAL VERSION', 60, window.innerWidth / 3 * 2, window.innerHeight / 3 * 2 - 30, 'center', 'white');
        this.writeTextToCanvas('Press S to start', 30, window.innerWidth / 2, window.innerHeight / 20 * 19, 'center', 'red');
    }
}
//# sourceMappingURL=app.js.map