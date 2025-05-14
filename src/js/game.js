import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Label, FontUnit, Color, Font } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { WaterBackground } from './background.js' 
import { Player } from './player.js' 

export class Game extends Engine {
    score = 0
    scoreLabel

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        let waterBackground = new WaterBackground()
        this.add(waterBackground)

        
        for (let i = 0; i < 10; i++) {
            let fish = new Fish()
            this.add(fish)
        }

    
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(20, 20),
            font: new Font({
                family: 'Upheavtt',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })

        this.add(this.scoreLabel)
        

        let player = new Player()
        player.game = this
        this.add(player)
    }

    addScore(points = 1) {
        this.score += points
        this.scoreLabel.text = `Score: ${this.score}`
    }
}

new Game()
