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

        this.writeTextToCanvas(`Press S to continue`, 30, window.innerWidth / 2, window.innerHeight / 20 * 19, 'center', 'white');
    }
}