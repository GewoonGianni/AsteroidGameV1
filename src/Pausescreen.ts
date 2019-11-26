/// <reference path="GameScreen.ts"/>

class Pausescreen extends GameScreen {
    /**
     * this is for giving some super information to this screen
     * @param canvas the html canvas
     * @param ctx redering context
     */
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) {
        super(canvas, ctx);
    }

    /**
     * this will draw the screen
     */
    public drawScreen() {
        this.writeTextToCanvas('PAUSE', 250, window.innerWidth / 2, window.innerHeight / 3, 'center', 'white');

        this.drawPause();

        this.writeTextToCanvas(`Press 'S' to continue`, 20, window.innerWidth / 2, window.innerHeight / 10 * 9, 'center', 'white');
    }

    /**
     * draw the two stripes that look like a pause button
     */
    private drawPause(){
        this.ctx.beginPath();
        this.ctx.lineWidth = 50;
        this.ctx.strokeStyle = "white";
        this.ctx.rect(window.innerWidth / 2 - 75, window.innerHeight / 2, 40, 200);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineWidth = 50;
        this.ctx.strokeStyle = "white";
        this.ctx.rect(window.innerWidth / 2 + 40, window.innerHeight / 2, 40, 200);
        this.ctx.stroke();
    }
}