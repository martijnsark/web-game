import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Label, FontUnit, Color, Font } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { WaterBackground } from './background.js'
import { Player } from './player.js'
import { UI } from './ui.js'

export class Game extends Engine {


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


        this.ui = new UI(20, 20)
        this.add(this.ui)

        let playerOne = new Player("Timmy", 250, 225, "W", "S", "A", "D", 1)
        let playerTwo = new Player("Kevin", 100, 100, "Up", "Down", "Left", "Right", 2)
        this.add(playerOne)
        this.add(playerTwo)
    }


}

new Game()
