/// <reference path="GameScreen.ts"/>
class levelscreen extends GameScreen{

    private lifes: number;

    private scoreAmount: number;

    private source: string;

    private img: HTMLImageElement;

    private barimg: HTMLImageElement;

    private hit: boolean;

    private hitcheck: boolean;

    // Asteroids
    private asteroids: Asteroid[];


    // ship
    private ship: Ship;

    public constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        lifes: number,
        score: number,
        imageURL: string,
    ) {
        super(canvas, ctx)

        this.lifes = lifes;

        this.scoreAmount = score;

        this.source = imageURL;

        this.loadImage(imageURL);

        this.loadBarImage('./assets/images/healthbar.png')

        // draw player ship
        // this.ship = new Ship("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png", this.canvas.width / 2 - 22, this.canvas.height / 2 - 60, 8, 8, new KeyboardListener())

        this.ship = new Ship("./assets/images/avengerShip.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, new KeyboardListener())

        // const asteroidFilenames: string[] = [
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
        //     "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
        // ];

        const asteroidFilenames: string[] = [
            "./assets/images/asteroids/asteroid1.png",
            "./assets/images/asteroids/asteroid2.png",
            "./assets/images/asteroids/asteroid3.png",
            "./assets/images/asteroids/astroid1.png",
            "./assets/images/asteroids/astroid2.png",
        ];

        this.asteroids = [];
        for (let i = 0; i < this.randomNumber(5, 20); i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length);

            this.asteroids.push(
                new Asteroid(
                    asteroidFilenames[randomIndex],
                    this.randomNumber(50, this.canvas.width - 121),
                    this.randomNumber(50, this.canvas.height - 99),
                    this.randomNumber(1, 10),
                    this.randomNumber(1, 10),
                ),
            );
        }

        this.hit = false;
    }

    public getLifes () {
        return this.lifes;
    }

    public drawScreen() {
        let hitCheckArray: Array<any> = [];

        // Move and draw all the game entities, check if something is hitting the ship
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);

            // let asteroidBox = asteroid.collisionBox(); // [this.xPos, this.yPos, this.img.width / 2]

            // let shipBox = this.ship.collisionBox(); // [this.xPos, this.yPos, 80]

            // let distance = Math.sqrt(((shipBox[0] - asteroidBox[0]) * (shipBox[0] - asteroidBox[0])) + ((shipBox[1] - asteroidBox[1]) * (shipBox[1] - asteroidBox[1])));

            // if (distance <= (shipBox[2] + asteroidBox[2]) && this.hit == false){
            //     this.lifes -= 1;
            //     this.hit = true;
            // }

            // if (distance <= (shipBox[2] + asteroidBox[2])) {
            //     
            // }

            if(this.ship.isColliding(asteroid) == true && this.hit == false) {
                this.lifes -= 1;
                this.hit = true;
            } 
            if(this.ship.isColliding(asteroid) == true) {
                hitCheckArray.push(1)
            }
        });

        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);

        if(this.hit == true) {
            this.ship.fire(this.ctx);
        }

        if (hitCheckArray[0] !== 1) {
            this.hit = false;
        }

        this.drawLifes();
        this.drawtext();
    }

    private drawtext() {
        this.writeTextToCanvas(`Score: ${this.scoreAmount}`, 20, window.innerWidth / 20 * 19, window.innerHeight / 20, "right", 'white')
    }

    private drawLifes() {
        this.ctx.drawImage(this.barimg, window.innerWidth / 20, window.innerHeight / 20);
        for (let i: number = 0; i < this.lifes; i++) {
            this.ctx.drawImage(this.img, window.innerWidth / 20 + 3 + 20 * i, window.innerHeight / 20 + 3);
        }
    }

    private loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }

    private loadBarImage(source: string) {
        this.barimg = new Image();
        this.barimg.src = source;
    }

    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

}