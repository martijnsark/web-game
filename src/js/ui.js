import { Actor, Label, Font, FontUnit, Color, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class UI extends Label {

    //constructor for labels (default features)
    constructor(x, y, playerNumber, text) {
        super({
            text: text,
            pos: new Vector(x, y),
            font: new Font({
                family: 'Upheavtt',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        });
        this.playerNumber = playerNumber;
    }

    updateScore(score) {
        this.text = `Score P${this.playerNumber}: ${score}`;
    }
}