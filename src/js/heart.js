import { Obstacle } from './obstacle.js';
import { Resources } from './resources.js';
import { Vector } from "excalibur";

export class Heart extends Obstacle {
    constructor() {
        super(
            1800, 900,
            Resources.Heart.toSprite()
        );
        this.scale = new Vector(1.2, 1.2)
        this.events.on("exitviewport", (e) => this.#heartLeft(e))
    }

    //if player removed Heart reset back alive and position
    diedByPlayer() {
        this.unkill
        this.pos = new Vector(1800, 900)
        this.vel = new Vector(-300, 0)
    }

    //if out screen reset Heart to repeat cycle
    #heartLeft(e) {
        this.pos = new Vector(1800, 900)
        this.vel = new Vector(-300, 0)
    }
}