/// <reference path="GameScreen.ts"/>
class Highscorescreen extends GameScreen{

    private readonly highscores: any[];
    private readonly player: string;
    private readonly score: number;

    /**
     * this will construct the screen
     * @param canvas the canvas
     * @param ctx the rendering context
     */
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx)

        this.player = "Player one";
        this.score = 400;

        this.highscores = [
            {
                playerName: "Gianni",
                score: 69420,
            },
            {
                playerName: "Loek",
                score: 40000,
            },
            {
                playerName: "Daan",
                score: 34000,
            },
            {
                playerName: "Rimmert",
                score: 200,
            },
        ];
    }

    /**
     * this is the main function an will draw the screen
     */
    public drawScreen() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;

        // 1. draw your score
        this.writeTextToCanvas(
            `${this.player} score is ${this.score}`,
            80,
            x,
            y - 100,
        );

        // 2. draw all highscores
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);

        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${
                this.highscores[i].score
                }`;
            this.writeTextToCanvas(text, 20, x, y);
        }

        this.writeTextToCanvas(`Press 'R' to restart`, 20, window.innerWidth / 2, window.innerHeight / 10 * 9, 'center', 'red')
    }
}