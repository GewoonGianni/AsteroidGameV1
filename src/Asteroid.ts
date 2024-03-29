/// <reference path="GameEntity.ts"/>
class Asteroid extends GameEntity{

    asteroid: number[];

    /**
     * Construct a new Asteroid object.
     *
     * @param imgUrl url of the image to load
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
    ) {
        super(imgUrl, xPos, yPos, xVel, yVel)
    }

    /**
     * Let the asteroid move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        if (
            (this.xPos + this.img.width / 2 > canvas.width) ||
            (this.xPos - this.img.width / 2 < 0)
        ) {
            this.xVel = -this.xVel;
        }
        if (
            this.yPos + this.img.height / 2 > canvas.height && this.yVel > 0
        ) {
            this.yVel = -this.yVel;
        }
        if (
            this.yPos - this.img.height / 2 < 0 && this.yVel < 0
        ) {
            this.yVel = -this.yVel;
        }

        // Use the velocity to change the position
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
}
