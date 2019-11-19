class Ship {
    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private img: HTMLImageElement;
    private KeyboardListener: KeyboardListener;
    private rotation: number = 0;

    /**
     * this is the constructor for the Ship class
     * @param imgURL the url of the image as a string
     * @param xPos the position of the ship on the x-axis
     * @param yPos the position of the ship on the y-axis
     */
    public constructor(imgURL: string, xPos: number, yPos: number, xVel: number, yVel: number, keyboardListener: KeyboardListener) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;

        this.KeyboardListener = keyboardListener;

        this.loadImage(imgURL);
    }

    /**
     * movement of the ship
     * @param canvas the canvas over wich you want to move
     */
    public move(canvas: HTMLCanvasElement) {
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
                this.yPos = 1
            }
            if (this.yPos >= window.innerHeight - this.img.height) {
                this.yPos = window.innerHeight - 1 - this.img.height;
            }
        }
        // if (this.KeyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
        //     this.yPos += this.yVel;
        // }
    }

    /**
     * 
     * @param ctx 
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();
        }

    }

    private loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }

    private degreeToRadion(degree: number) {
        return Math.PI / 180 * degree;
    }
}