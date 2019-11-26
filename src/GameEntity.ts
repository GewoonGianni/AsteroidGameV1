class GameEntity {    
    protected xPos: number;
    protected yPos: number;
    protected xVel: number;
    protected yVel: number;
    protected img: HTMLImageElement;


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
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.loadImage(imgUrl);
    }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    private loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }

    /**
     * This function gets the Y position
     */
    public getYpos():number{
        return this.yPos;
    }

    /**
     * This function gets the X position
     */
    public getXpos():number{
        return this.xPos;
    }

    /**
     * This function gets the IMG height
     */
    public getIMGheight():number{
        return this.img.height;
    }

    /**
     * This function gets the IMG width
     */
    public getIMGwidth():number{
        return this.img.width;
    }
}