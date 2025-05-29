import { Actor, Vector, Engine, ExitViewPortEvent } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Obstacle } from './obstacle.js'

export class Arrow extends Actor {

    constructor(x, y) {
        super({ width: Resources.Arrow.width, height: Resources.Arrow.height })
        this.graphics.use(Resources.Arrow.toSprite())
        this.scale = new Vector(0.05, 0.05)
        this.pos = new Vector(x, y)
        this.vel = new Vector(220, 0)
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('ExitViewPortEvent', (event) => this.kill())
    }

    hitSomething(event) {
        if (event.other.owner instanceof Obstacle) {
            event.other.owner.diedByPlayer();
            this.kill()
        }
    }
}



