class Asteroid {
    // attributes
    private img: HTMLImageElement;
    private xPosition: number;
    private yPosition: number;
    private xVelocity: number;
    private yVelocity: number;
    // constructor

    public constructor(xPosition: number, yPosition: number, xVelocity: number, yVelocity: number, imgURL: string) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;

        this.loadImage(imgURL);
    }

    // method
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.xPosition, this.yPosition);
    }

    public move(canvas: HTMLCanvasElement) {
        this.xPosition += this.xVelocity;
        this.yPosition += this.yVelocity;
        if (this.xPosition > window.innerWidth - this.img.width) {
            this.xVelocity = -1;
        }
        if (this.yPosition > window.innerHeight - this.img.height) {
            this.yVelocity = -1;
        }
        if (this.xPosition < 0) {
            this.xVelocity = 1;
        }
        if (this.yPosition < 0) {
            this.yVelocity = 1;
        }
        this.draw
    }

    private loadImage(source: string) {
        this.img = new Image()

        this.img.src = source;
    }
}