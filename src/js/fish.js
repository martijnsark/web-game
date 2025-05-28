import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Fish extends Actor {

    //constructor for obstakels (default features)
    constructor() {
        super({
            width: 100,
            height: 100,
            collisionType: CollisionType.Active
        })
        this.graphics.use(Resources.Fish.toSprite())
        this.scale = new Vector(1.2, 1.2)
        this.pos = new Vector(Math.random() * 1700, 900)
        this.vel = new Vector(-500, 0)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.events.on("exitviewport", (e) => this.fishLeft(e))
        this.body.friction = 0
    }

    //if obstakel not moving reset velocity
    onPreUpdate(engine) {
        if (this.vel.x >= 0) {
            this.vel = new Vector(-150, 0)
        }
    }

    //if player killed obstakel reset back alive and position
    diedByPlayer() {
        this.unkill
        this.pos = new Vector(1535, 900)
        this.vel = new Vector(-150, 0)
    }

    //if out screen reset obstakels to repeat cycle
    fishLeft(e) {
        this.pos = new Vector(1535, 900)
        this.vel = new Vector(-150, 0)
    }
}