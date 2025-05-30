import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {

    //constructor for backgrounds (default features)
    constructor(x, y){
        super()
        this.graphics.use(Resources.waterBackground.toSprite())
        this.scale = new Vector(1, 1)
        this.pos = new Vector(x, y)
        this.vel = new Vector(-150, 0)
        this.events.on("exitviewport", (e) => this.backgroundLeft(e))
    }

    //reset background scroll position
    backgroundLeft(e) {
        this.pos = new Vector(2275, 514)
    }

    
}


