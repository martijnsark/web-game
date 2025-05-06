import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

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
        console.log("start de game!")


        const waterBackground = new Actor({
            x: 0,
            y: 0,
            width: 10,
            height: 10,
        });
        waterBackground.graphics.use(Resources.waterBackground.toSprite())
        this.add(waterBackground)


        for (let i = 0; i < 10; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())
            fish.pos = new Vector(Math.random() * 1280, Math.random() * 720)
            fish.vel = new Vector(Math.random() * -200, 0)
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)

            const fish1 = new Actor()
            fish1.graphics.use(Resources.Fish1.toSprite())
            fish1.pos = new Vector(Math.random() * 1280, Math.random() * 720)
            fish1.vel = new Vector(Math.random() * -200, 0)
            fish1.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish1)

            const fish2 = new Actor()
            fish2.graphics.use(Resources.Fish2.toSprite())
            fish2.pos = new Vector(Math.random() * 1280, Math.random() * 720)
            fish2.vel = new Vector(Math.random() * -200, 0)
            fish2.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish2)
        }
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
