class levelscreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private lifes: number;

    private scoreAmount: number;

    private source: string;

    private img: HTMLImageElement;

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
        this.canvas = canvas;
        this.ctx = ctx;

        this.lifes = lifes;

        this.scoreAmount = score;

        this.source = imageURL;

        this.loadImage(imageURL);

        // draw player ship
        // this.ship = new Ship("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, new KeyboardListener())

        this.ship = new Ship("./assets/images/bengalcarrierforgame.png", this.canvas.width / 2, this.canvas.height / 2, 5, 5, new KeyboardListener())

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
    }

    public drawScreen() {
        // Clear the canvas
        

        // Move and draw all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
        });

        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);

        this.drawLifes();
        this.drawtext();
    }

    /**
     * Method game loop
     */
    public loop = () => {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Move and draw all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
        });

        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);

        this.drawScreen();

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }

    private drawtext() {
        this.writeTextToCanvas(`Score: ${this.scoreAmount}`, 20, window.innerWidth / 20 * 19, window.innerHeight / 20, "right", 'white')
    }

    private drawLifes() {
        for (let i: number = 0; i < this.lifes; i++) {
            this.ctx.drawImage(this.img, window.innerWidth / 20 + this.img.width  * i, window.innerHeight / 20);
        }
    }

    private writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Agency_Bold`; // minecraft
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    private loadImage(source: string) {
        this.img = new Image();
        this.img.src = source;
    }

    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

}