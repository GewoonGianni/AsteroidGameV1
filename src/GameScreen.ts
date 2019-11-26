class GameScreen {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    public constructor (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
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
        this.ctx.font = `${fontSize}px Agency_Bold`; // minecraft
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}