import { Actor, Label, Font, FontUnit, Color, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class UI extends Actor {

    scoreLabel1
    scoreLabel2


    constructor(x, y, labelName) {
        super()

        this.scoreLabel1 = new Label({
            text: 'Score P1: 0',
            pos: new Vector(x, y),
            font: new Font({
                family: 'Upheavtt',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.scoreLabel1)

        this.scoreLabel2 = new Label({
            text: 'Score P2: 0',
            pos: new Vector(x, y + 40), 
            font: new Font({
                family: 'Upheavtt',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.scoreLabel2)

    }

    showScore(playerNumber, score) {
        if (playerNumber === 1) {
            this.scoreLabel1.text = `Score P1: ${score}`;
        } else if (playerNumber === 2) {
            this.scoreLabel2.text = `Score P2: ${score}`;
        }
    }

}