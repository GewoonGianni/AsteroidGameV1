/// <reference path="GameEntity.ts"/>
class Bullet extends GameEntity {
    rotation: number;
    public constructor(
        imgURL: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        rotation: number,
    ) {
        super(imgURL, xPos, yPos, xVel, yVel);

        this.loadImage(imgURL)
        this.rotation = rotation;
    }

    public draw(ctx:CanvasRenderingContext2D) {
        if (this.img.naturalWidth > 0) {
            ctx.save();

            ctx.translate(this.xPos + 0.5 * this.img.width, this.yPos + 0.5 * this.img.height);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.xPos + 0.5 * this.img.width), -(this.yPos + 0.5 * this.img.height));

            ctx.drawImage(this.img, this.xPos, this.yPos);

            ctx.restore();
        }
    }

    public move() {
        this.yPos -= Math.cos(this.rotation) * this.yVel;
        this.xPos += Math.sin(this.rotation) * this.xVel;
    }

    /**
     * this will check if the bullet is colliding with an object
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
}