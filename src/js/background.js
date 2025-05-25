import { Actor, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class WaterBackground extends Actor {

    constructor(x, y){
        super()
        this.graphics.use(Resources.waterBackground.toSprite())
        this.scale = new Vector(1, 1)
        this.pos = new Vector(x, y)
        this.vel = new Vector(-150, 0)
        this.events.on("exitviewport", (e) => this.backgroundLeft(e))
    }

    backgroundLeft(e) {
        this.pos = new Vector(2275, 514)
    }

    
}


