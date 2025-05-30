import { Label, Font, FontUnit, Color, Vector } from "excalibur"

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

    //updates score by entering text + playernumber + actual score
    updateScore(score) {
        this.text = `Score P${this.playerNumber}: ${score}`;
    }

    
    updateLives(lives) {
       this.text = `P${this.playerNumber} remaining lives: ${lives}`;
    }
}