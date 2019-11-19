class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;


    // Some global player attributes
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: Array<any>; // TODO: do not use 'any': write an interface!

    private asteroids: Asteroid[] = new Array;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        this.player = "Player one";
        this.score = 400;
        this.lives = 3;

        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ]

        this.loadImage('./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png', this.donothing)

        // All screens: uncomment to activate
        // this.startScreen();
        this.levelScreen();
        // this.titleScreen();

        this.asteroids = [];

        
    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Method to initialize the splash screen
     */
    public startScreen() {
        this.writeText('Asteroids', 8, window.innerWidth / 2, window.innerHeight / 5, 'center', '#ffffff')

        //2. add 'Press to play' text
        this.writeText('Press the button to play!', 5, window.innerWidth / 2, window.innerHeight / 5 * 2, 'center', '#ffffff')

        //4. add Asteroid image
        // this mess is for randomizing the image (yay!)
        let secondCollorArray: Array<string> = ['brown', 'grey'];
        let colorArray: Array<string> = ['blue', 'green', 'orange', 'red'];
        let randomArray: Array<string> = ['Meteors/meteor' + secondCollorArray[this.randomNumber(0, 1)] + '_big' + this.randomNumber(1, 4) + '.png', 'playerShip' + (this.randomNumber(1, 3)) + '_' + colorArray[Math.floor(Math.random() * 4)] + '.png']
        const meteor_image: any = './assets/images/SpaceShooterRedux/PNG/' + randomArray[Math.floor(Math.random() * 2)];

        // this actually loads the image
        this.loadImage(meteor_image, this.loadTheMeteorImage);

        //3. add button with 'start' text
        const startbuttonImage: any = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
        this.loadImage(startbuttonImage, this.loadTheStartButtonImage);

    }

    private loadTheMeteorImage(img: HTMLImageElement) {
        this.ctx.drawImage(img, window.innerWidth / 2 - img.width / 2, window.innerHeight / 5 * 3 - img.height / 2);
    }

    private loadTheStartButtonImage(img: HTMLImageElement) {
        this.ctx.drawImage(img, window.innerWidth / 2 - img.width / 2, window.innerHeight / 5 * 4 - img.height / 10 * 8.75);
        this.writeText('start!', 2.5, window.innerWidth / 2, window.innerHeight / 5 * 4, 'center', 'black');
    }

    //-------- level screen methods -------------------------------------
    /**
     * Method to initialize the level screen
     */
    public levelScreen() {
        this.createAsteroid(2)
        this.loop();
    }

    public createAsteroid(numberOfAsteroids: number) {
        for (let i = 0; i < numberOfAsteroids; i++) {
            const newAsteroid = new Asteroid(100, 100, 1, 1, './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png');
            console.log(newAsteroid);
            this.asteroids.push(newAsteroid);
        }
        console.log(this.asteroids)
    }

    public loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.asteroids.forEach(newAsteroid => {
            newAsteroid.draw(this.ctx);
            console.log(newAsteroid)
            newAsteroid.move(this.canvas);
        });

        console.log('a')
        requestAnimationFrame(this.loop);
    }

    private donothing ( ) {
        // helemaal niks doen lekker!
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Method to initialize the title screen
    */
    public titleScreen() {
        //1. draw your score
        this.writeText('Your score is 4100!', 6, window.innerWidth / 2, window.innerHeight / 5, 'center', '#eeeeee');

        //2. draw all highscores
        this.writeText('Leaderboard', 4, window.innerWidth / 2, window.innerHeight / 5 * 2, 'center', '#eeeeee')

        for (let i: number = 0; i < this.highscores.length; i++) {
            const name: string = this.highscores[i].playerName;
            const score: number = this.highscores[i].score;

            this.writeText(`${i + 1}: ${name} - ${score}`, 2, window.innerWidth / 2, window.innerHeight / 5 * 2 + 35 * i + 40, 'center', '#eeeeee')
        }
    }

    //-------Generic canvas methods ----------------------------------

    /**
     * Loads an image file into the DOM and writes it to the canvas. After the
     * image is loaded and ready to be drawn to the canvas, the specified
     * callback method will be invoked. the method will be called with the
     * loaded imageElement as a parameter.
     *
     * The callback method MUST be a method of this class with a header like:
     *
     *   private yourMethodNameHere(img: HTMLImageElement)
     *
     * In the body of that callback you can draw the image to the canvas
     * context like:
     *
     *   this.ctx.drawImage(img, someX, someY);
     *
     * This is the simplest way to draw images, because the browser must and
     * shall wait until the image is completely loaded into memory.
     *
     * @param {string} source - the name of the image file
     * @param {Function} callback - method that is invoked after the image is loaded
     */
    private loadImage(source: string, callback: Function) {
        let imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });

        // Now, set the src to start loading the image
        imageElement.src = source;
    }

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    private writeText(input: string, fontSize: number, xCoordinate: number, yCoordinate: number, alignment: CanvasTextAlign = 'center', color: string) {
        this.ctx.textAlign = alignment;
        let centerX: number = xCoordinate;
        let centerY: number = yCoordinate;
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}em Minecraft`;
        this.ctx.fillText(`${input}`, centerX, centerY);
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);
