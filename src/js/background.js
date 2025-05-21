import { Actor, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class WaterBackground extends Actor {

    constructor(x, y){
        super()
        this.graphics.use(Resources.waterBackground.toSprite())
        this.scale = new Vector(0.42, 0.42)
        this.pos = new Vector(x, y)
        this.vel = new Vector(-50, 0)
        this.events.on("exitviewport", (e) => this.backgroundLeft(e))
    }

    backgroundLeft(e) {
        this.pos = new Vector(1850, 0)
    }

    
}


