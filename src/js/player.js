import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources, ResourceLoader, } from './resources.js'
import { Fish } from './fish.js'

export class Player extends Actor {

    constructor(){
        super({ width: 100, height: 100, collisionType:CollisionType.Active })
        this.graphics.use(Resources.Fish1.toSprite())
        this.scale = new Vector(1, 1)
        this.pos = new Vector(10, 360)
        this.vel = new Vector(1, 0)
        this.events.on("exitviewport", (e) => this.playerTop(e))
        this.events.on("exitviewport", (e) => this.playerDown(e))
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event){
        if (event.other.owner instanceof Fish) {
            event.other.owner.diedByPlayer();
            Resources.Crunch.play(0.5);
            if (this.game) {
                this.game.addScore(1)
            }
        }
    }

    onPreUpdate(engine){
        let kb = engine.input.keyboard
        let yspeed = 0
        let xspeed = 0

        if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up)) {
            yspeed = -200
        } 
        
        if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) {
            yspeed = 200
        }

        if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) {
            xspeed = -200
        } 
        
        if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) {
            xspeed = 200
        }

        this.vel = new Vector(xspeed, yspeed)
    }

    playerTop(e) {
        this.pos = new Vector(10, 721)
    }

    playerDown(e) {
        this.pos = new Vector(10, -1)
    }
}