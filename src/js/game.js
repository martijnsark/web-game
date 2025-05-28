import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Label, FontUnit, Color, Font, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { WaterBackground } from './background.js'
import { Player } from './player.js'
import { UI } from './ui.js'
import { Floor } from './Floor.js'

export class Game extends Engine {


    constructor() {
        super({
            width: 1530,
            height: 1024,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
    }

    startGame() {
        this.add(new WaterBackground(0, 514))
        this.add(new WaterBackground(1535, 514))

        this.add(new Floor(500, 1080))
        this.add(new Floor(1500, 1080))

        this.add(new UI(20, 20))

        this.add(new Player(120, 900, 1))
        this.add(new Player(400, 900, 2))

        for (let i = 0; i < 5; i++) {
            let fish = new Fish()
            this.add(fish)
        }
        
    }
}

new Game()
