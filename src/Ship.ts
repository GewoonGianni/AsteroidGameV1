/// <reference path="GameEntity.ts"/>
class Ship extends GameEntity {
    private KeyboardListener: KeyboardListener;
    private rotation: number = 0;
    private fireimg: HTMLImageElement;

    /**
     * this is the constructor for the Ship class
     * @param imgURL the url of the image as a string
     * @param xPos the position of the ship on the x-axis
     * @param yPos the position of the ship on the y-axis
     */
    public constructor(imgURL: string, xPos: number, yPos: number, xVel: number, yVel: number, keyboardListener: KeyboardListener) {
        super(imgURL, xPos, yPos, xVel, yVel)

        this.KeyboardListener = keyboardListener;

        this.loadFireImage('./assets/images/explosion.png');
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
     * draw the ship
     * @param ctx 
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this ship
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();
        }

    }

    /**
     * this will check if the ship is colliding with an object
     * @param GameEntity this is the object
     */
    public isColliding(GameEntity: GameEntity):boolean {
        if ((this.yPos + this.img.height > GameEntity.getYpos()) 
        && (this.yPos < (GameEntity.getYpos() + GameEntity.getIMGheight())) 
        && ((this.xPos + this.img.width) > GameEntity.getXpos()) 
        && (this.xPos < (GameEntity.getXpos() + GameEntity.getIMGwidth()))){
            return true
        }
        return false
    }

    /**
     * this will return the number in radian
     * @param degree the number in degrees
     */
    private degreeToRadion(degree: number) {
        return Math.PI / 180 * degree;
    }

    /**
     * this is for drawing the weird explosion
     * @param ctx the rendering context
     */
    public fire(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this.fireimg, this.xPos + this.img.width / 2 - 47.5, this.yPos + this.img.height / 2 - 47.5)
    }

    /**
     * the function that will load the explosion before drawing it
     * @param source the path to the fire image
     */
    private loadFireImage(source: string) {
        this.fireimg = new Image();
        // Now, set the src to start loading the image
        this.fireimg.src = source;
    }

    public getRotation(){
        return this.rotation;
    }
}