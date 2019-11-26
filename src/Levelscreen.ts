/// <reference path="GameScreen.ts"/>
class levelscreen extends GameScreen {

    private lifes: number;

    private scoreAmount: number;

    private source: string;

    private img: HTMLImageElement;

    private barimg: HTMLImageElement;

    private hit: boolean;

    // Asteroids
    private asteroids: Asteroid[];

    // ship
    private ship: Ship;

    // bullet
    private bullets: Bullet[];

    // files
    private asteroidFilenames: string[];

    // random locations
    private randomLocation: number[];

    // keylistener
    private keyListener: KeyboardListener;

    // framecounter
    private framecounter: number;

    // max spawnable asteroids
    private maxAsteroids: number;

    /**
     * this will construct the life screen
     * @param canvas the html canvas
     * @param ctx the rendering context
     * @param lifes the amount of lifes (always 10)
     * @param score the score yoou have to start with
     * @param imageURL the path to the life image
     */
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

        this.keyListener = new KeyboardListener();

        this.framecounter = 0;

        this.maxAsteroids = 15;

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

        this.asteroidFilenames = [
            "./assets/images/asteroids/asteroid1.png",
            "./assets/images/asteroids/asteroid2.png",
            "./assets/images/asteroids/asteroid3.png",
            "./assets/images/asteroids/astroid1.png",
            "./assets/images/asteroids/astroid2.png",
        ];

        // const asteroidFilenames: string[] = [
        //     "./assets/images/asteroids/asteroid1.png",
        //     "./assets/images/asteroids/asteroid2.png",
        //     "./assets/images/asteroids/asteroid3.png",
        //     "./assets/images/asteroids/astroid1.png",
        //     "./assets/images/asteroids/astroid2.png",
        // ];

        this.randomLocation= [
            canvas.height + 130,
            -130,
        ]

        let j:number = 0;

        this.bullets = [];

        this.asteroids = [];
        for (let i = 0; i < this.maxAsteroids; i++) {
            const randomIndex = j;
            j++
            if(j == 5){
                j = 0;
            }

            this.asteroids.push(
                new Asteroid(
                    this.asteroidFilenames[randomIndex],
                    this.randomNumber(121, canvas.width -121),
                    this.randomLocation[this.randomNumber(0,1)],
                    this.randomNumber(1, 5),
                    this.randomNumber(1, 5),
                ),
            );
        }

        this.hit = false;
    }

    /**
     * this will return the amount of lifes left
     */
    public getLifes () {
        return this.lifes;
    }

    /**
     * this is the main function of this screen, it will draw all entitys on the screen.
     */
    public drawScreen() {
        let hitCheckArray: Array<any> = [];

        // Move and draw all the game entities, check if something is hitting the ship
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);

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

        // new bullet
        if(this.keyListener.isKeyDown(KeyboardListener.KEY_SPACE) && this.framecounter % 20 == 0){
            this.bullets.push(new Bullet('./assets/images/laser.png', this.ship.getXpos() + this.ship.getIMGwidth() / 2 + (Math.sin(this.ship.getRotation()) * 50), this.ship.getYpos() + this.ship.getIMGheight() / 2 - (Math.cos(this.ship.getRotation()) * 50), 10,10, this.ship.getRotation()));
        }

        // bullet stuff 
        let index = 0
        this.bullets.forEach((bullet: Bullet) => {
            bullet.move();
            bullet.draw(this.ctx);

            if(bullet.getXpos() < -10 || bullet.getXpos() > window.innerWidth + 10 || bullet.getYpos() < -10 || bullet.getYpos() > window.innerHeight + 10){
                this.bullets.splice(index, 1);
            }
            
            for (let i = 0; i < this.asteroids.length; i++) {
                const element = this.asteroids[i];

                if(bullet.isColliding(element)){
                    this.bullets.splice(index, 1)
                    this.asteroids.splice(i, 1);
                }
            }
            index++;
        });
 
        // fire
        if(this.hit == true) {
            this.ship.fire(this.ctx);
        }

        // check if still getting hit
        if (hitCheckArray[0] !== 1) {
            this.hit = false;
        }

        // respawn
        if(this.asteroids.length < this.maxAsteroids){
            this.scoreAmount += 50;
            this.asteroids.push(
                new Asteroid(
                    this.asteroidFilenames[this.randomNumber(0,4)],
                    this.randomNumber(121, this.canvas.width -121),
                    this.randomLocation[this.randomNumber(0,1)],
                    this.randomNumber(1, 5),
                    this.randomNumber(1, 5),
                ),
            );
        }
        
        this.scoreAmount += 1;

        this.drawLifes();
        this.drawtext();

        this.framecounter ++;
    }

    /**
     * this wil draw the score
     */
    private drawtext() {
        this.writeTextToCanvas(`Score: ${this.scoreAmount}`, 20, window.innerWidth / 20 * 19, window.innerHeight / 20, "right", 'white')
    }

    /**
     * this wil draw the bar and everything inside it
     */
    private drawLifes() {
        this.ctx.drawImage(this.barimg, window.innerWidth / 20, window.innerHeight / 20);
        for (let i: number = 0; i < this.lifes; i++) {
            this.ctx.drawImage(this.img, window.innerWidth / 20 + 3 + 20 * i, window.innerHeight / 20 + 3);
        }
    }

    /**
     * this wil load the red health image
     * @param source this  is the path to the image
     */
    private loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }

    /**
     * this will load the bar image
     * @param source this is the path to the white bar
     */
    private loadBarImage(source: string) {
        this.barimg = new Image();
        this.barimg.src = source;
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * get the score
     */
    public getScore(){
        return this.scoreAmount;
    }
}