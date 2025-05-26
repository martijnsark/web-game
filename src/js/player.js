import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
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



    constructor(name, x, y, playerNumber) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active })
        this.name = name;
        this.score = 0;
        this.playerNumber = playerNumber
        this.lastShotTime = 0;
        this.initialX = x;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.graphics.use(Resources.Fish1.toSprite())
        this.scale = new Vector(2, 2)
        this.gravity = new Vector(0, 800),
        this.pos = new Vector(x, y)
        this.vel = new Vector(1, 0)

        this.events.on("exitviewport", (e) => this.playerTop(e))
        this.events.on("exitviewport", (e) => this.playerDown(e))

        console.log(`My name is ${this.name}`)
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
        this.pos.x = this.initialX;

        //simpel shooting
        if (this.playerNumber === 1 && engine.input.keyboard.wasPressed(Keys.E)) {
            this.shoot()
        }
        if (this.playerNumber === 2 && engine.input.keyboard.wasPressed(Keys.Enter)) {
           this.shoot()
        }

        if (this.playerNumber === 1 && engine.input.keyboard.wasPressed(Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -6000))
        }

        if (this.playerNumber === 2 && engine.input.keyboard.wasPressed(Keys.ShiftRight)) {
            this.body.applyLinearImpulse(new Vector(0, -6000))
        }

    }

    playerTop(e) {
        this.pos = new Vector(10, 721)
    }

    playerDown(e) {
        this.pos = new Vector(10, -1)
    }
}