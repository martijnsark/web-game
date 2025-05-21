import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources, ResourceLoader, } from './resources.js'
import { Fish } from './fish.js'
import { Arrow } from './Arrow.js'


export class Player extends Actor {

    //eigenschappen (deze worden onthouden)
    name
    score
    upKey
    downKey
    leftKey
    rightKey
    playerNumber


    constructor(name, x, y, upKey, downKey, leftKey, rightKey, playerNumber) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active })
        this.name = name;
        this.score = 0;
        this.upKey = upKey
        this.downKey = downKey
        this.leftKey = leftKey
        this.rightKey = rightKey
        this.playerNumber = playerNumber
        this.lastShotTime = 0;
        console.log(`My name is ${this.name}`)


        this.graphics.use(Resources.Fish1.toSprite())
        this.scale = new Vector(1, 1)
        this.pos = new Vector(x, y)
        this.vel = new Vector(1, 0)

        this.events.on("exitviewport", (e) => this.playerTop(e))
        this.events.on("exitviewport", (e) => this.playerDown(e))
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof Fish) {
            event.other.owner.diedByPlayer();
            Resources.Crunch.play(0.5);
            this.score++
            if (this.scene.engine.ui) {
                this.scene.engine.ui.showScore(this.playerNumber, this.score);
            }
        }
    }

    shoot() {
        const now = Date.now()
        if (now - this.lastShotTime >= 1100) {
            this.scene.add(new Arrow(this.pos.x + 10, this.pos.y + 10))
            this.lastShotTime = now; 
        }
    }


    onPreUpdate(engine) {
        let kb = engine.input.keyboard
        let yspeed = 0
        let xspeed = 0

        //it fills the correct key based on what you enterd in the variable (game.js)
        if (kb.isHeld(Keys[this.upKey])) {
            yspeed = -200
        }

        if (kb.isHeld(Keys[this.downKey])) {
            yspeed = 200
        }

        if (kb.isHeld(Keys[this.leftKey])) {
            xspeed = -200
        }

        if (kb.isHeld(Keys[this.rightKey])) {
            xspeed = 200
        }

        if (kb.isHeld(Keys.E)) {
            this.shoot()
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