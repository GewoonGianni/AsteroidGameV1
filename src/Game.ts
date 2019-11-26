// tslint:disable member-ordering

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    // Some global player attributes
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;

    // keyboardListener
    private keyboardlistener: KeyboardListener;

    // startscreen 
    private startscreen: Startscreen;

    // levelscreen
    private levelscreen: levelscreen;

    // highscorescreen
    private highscorescreen: Highscorescreen;

    // pausescreen
    private pausescreen: Pausescreen;

    // currentscreen
    private currentscreen: any;

    /**
     * this will construct the game
     * @param canvasId the canvas on the index.html
     */
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");

        this.player = "Player one";

        // make startscreen
        this.startscreen = new Startscreen(this.canvas, this.ctx);

        // make pausescreen
        this.pausescreen = new Pausescreen(this.canvas, this.ctx);

        // make keyboardlistener
        this.keyboardlistener = new KeyboardListener();

        //make levelscreen
        // this.levelscreen = new levelscreen(this.canvas, this.ctx, 3, 4100, './assets/images/SpaceShooterRedux/PNG/UI/PlayerLIfe1_blue.png')
        this.levelscreen = new levelscreen(this.canvas, this.ctx, 10, 0, './assets/images/health.png')

        // make highscorescreen
        this.highscorescreen = new Highscorescreen(this.canvas, this.ctx);

        //set first screen to the startscreen
        this.currentscreen = this.startscreen;

        // the loop that runs this game
        this.loop();
    }

    /**
     * Method game loop
     */
    public loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.currentscreen.drawScreen();

        if (this.keyboardlistener.isKeyDown(KeyboardListener.KEY_S)) {
            this.currentscreen = this.levelscreen;
        } else if (this.levelscreen.getLifes() == 0 ) {
            this.highscorescreen.setScore(this.levelscreen.getScore())
            this.currentscreen = this.highscorescreen;
        } else if (this.keyboardlistener.isKeyDown(KeyboardListener.KEY_ESC)){
            this.currentscreen = this.pausescreen;
        } 
        if (this.keyboardlistener.isKeyDown(KeyboardListener.KEY_R)){
            location.reload();
        }
        
        requestAnimationFrame(this.loop);
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

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
    private loadImage(source: string, callback: (img: HTMLImageElement) => void) {
        const imageElement = new Image();

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
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
