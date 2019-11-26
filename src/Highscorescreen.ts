/// <reference path="GameScreen.ts"/>
class Highscorescreen extends GameScreen{

    private readonly highscores: any[]; // TODO: do not use 'any': write an interface!
    private readonly player: string;
    private readonly score: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx)

        this.player = "Player one";
        this.score = 400;

        this.highscores = [
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
    }
}