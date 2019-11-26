/// <reference path="GameScreen.ts"/>
class Controlsscreen extends GameScreen {
    constructor(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
        super(canvas, ctx)
    }

    public drawScreen(){
        //control text
        this.writeTextToCanvas(`up arrow - go forward`, 30, window.innerWidth / 2, window.innerHeight / 20 * 3, 'center', 'white');

        this.writeTextToCanvas(`left arrow - turn left`, 30, window.innerWidth / 2, window.innerHeight / 20 * 4, 'center', 'white');

        this.writeTextToCanvas(`right arrow - turn right`, 30, window.innerWidth / 2, window.innerHeight / 20 * 5, 'center', 'white');

        this.writeTextToCanvas(`HOLD spacebar - shoot`, 30, window.innerWidth / 2, window.innerHeight / 20 * 7, 'center', 'white');

        this.writeTextToCanvas(`esc - pause`, 30, window.innerWidth / 2, window.innerHeight / 20 * 9, 'center', 'white');

        // bottom text
        this.writeTextToCanvas(`Press S to start  -  Press R to go back to the title screen`, 30, window.innerWidth / 2, window.innerHeight / 20 * 19, 'center', 'red');
    }
}