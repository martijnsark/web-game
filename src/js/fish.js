import { Actor, Vector, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Fish extends Actor {

    constructor(){
        super({ width: 100, height: 100, collisionType:CollisionType.Active })
        this.graphics.use(Resources.Fish.toSprite())
        this.scale = new Vector(1, 1)
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.vel = new Vector(-150, 0)
        this.events.on("exitviewport", (e) => this.fishLeft(e))
    }

    onPreUpdate(engine) {
        if (this.vel.x >= 0) {
            this.vel = new Vector(-150, 0)
        }
    }

    diedByPlayer(){
        this.unkill
        this.pos = new Vector(1350, Math.random() * 720)
        this.vel = new Vector(-150, 0)
    }

    fishLeft(e) {
        this.pos = new Vector(1350, Math.random() * 720)
        this.vel = new Vector(-150, 0)
    }

    fishRight(e) {
        this.pos = new Vector(0, Math.random() * 720)
        this.vel = new Vector(-150, 0)
    }
}