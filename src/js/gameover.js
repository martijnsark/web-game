import { Scene, Label, Vector, Color, Font, FontUnit } from "excalibur";
import { UI } from './ui.js'

export class GameOver extends Scene {


    onInitialize(engine) {
        const gameOverLabel = new Label({
            text: "Game Over",
            pos: new Vector(600, 400),
            font: new Font({
                family: 'Upheavtt',
                size: 48,
                unit: FontUnit.Px,
                color: Color.Red
            })
        });

        this.add(gameOverLabel);
    }
}