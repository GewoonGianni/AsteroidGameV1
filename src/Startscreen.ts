class Startscreen {
    // attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    // constructor
    public constructor (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    // methods
    /**
     * Writes the loaded asteroids image pixels to the start screen
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeAsteroidImageToStartScreen(img: HTMLImageElement) {
        // Target position: center of image must be the center of the screen
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 5 * 2 + img.height / 2;

        this.ctx.drawImage(img, x, y);
    }

    public writeTextToCanvas(
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
        const imageElement = new Image();

        // Now, set the src to start loading the image
        imageElement.src = source;
        return imageElement
    }

    public drawScreen() {
        // // make the asteroids text
        // this.writeTextToCanvas('Asteroids', 100, window.innerWidth / 2, window.innerHeight / 5, 'center', 'white');

        // // add asteroid
        
        // this.ctx.drawImage(this.loadImage("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png"), window.innerWidth / 2, window.innerHeight / 2);

        // // add start text
        // this.writeTextToCanvas('Press S to start!', 60, window.innerWidth / 2, window.innerHeight / 5 * 4, 'center', 'white');

        // star citizen logo
        this.ctx.drawImage(this.loadImage('./assets/images/SC.png'), window.innerWidth / 3 * 2 - 175,  window.innerHeight / 3 - 175)

        // parody text
        this.writeTextToCanvas ('THE FINAL VERSION', 60, window.innerWidth / 3 * 2, window.innerHeight / 3 * 2 - 30, 'center', 'white')

        // nice text in bottom of screen
        this.writeTextToCanvas('Press S to start', 30, window.innerWidth / 2, window.innerHeight / 20 * 19, 'center', 'red')
    }
}