import { Scene, Label, Vector, Color, Font, FontUnit } from "excalibur";

export class GameOver extends Scene {
#gameOverLabel;

    onInitialize(engine) {
        this.#gameOverLabel = new Label({
            text: "Game Over",
            pos: new Vector(600, 400),
            font: new Font({
                family: 'Upheavtt',
                size: 48,
                unit: FontUnit.Px,
                color: Color.Red
            })
        });

        this.add(this.#gameOverLabel);
    }
}