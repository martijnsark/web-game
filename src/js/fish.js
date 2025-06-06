import { Obstacle } from './obstacle.js';
import { Resources } from './resources.js';
import { Vector } from "excalibur";

export class Fish extends Obstacle {
    constructor() {
        super(
            1500, 900,
            Resources.Fish.toSprite()
        );
        this.scale = new Vector(1.2, 1.2)
        this.events.on("exitviewport", (e) => this.#fishLeft(e))
    }

    //if player removed Heart reset back alive and position
    diedByPlayer() {
        this.unkill
        this.pos = new Vector(1500, 900)
        this.vel = new Vector(-300, 0)
    }

    //if out screen reset Heart to repeat cycle
    #fishLeft(e) {
        this.pos = new Vector(1500, 900)
        this.vel = new Vector(-300, 0)
    }
}