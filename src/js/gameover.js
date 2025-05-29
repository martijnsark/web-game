import { Scene, Label, Vector, Color, Font, FontUnit } from "excalibur";

export class GameOver extends Scene {
    onInitialize(engine) {
        const label = new Label({
            text: "Game Over",
            pos: new Vector(600, 400),
            font: new Font({
                family: 'Upheavtt',
                size: 48,
                unit: FontUnit.Px,
                color: Color.Red
            })
        });
        this.add(label);
    }
}