import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources, ResourceLoader, } from './resources.js'
import { Fish } from './fish.js'
import { Arrow } from './Arrow.js'
import { Floor } from './Floor.js'


export class Player extends Actor {

    //traits (these get rememberd)
    name
    score
    scoreTimer
    upKey
    downKey
    leftKey
    rightKey
    playerNumber
    isOnGround


    //constructor for player (default features)
    constructor(name, x, y, playerNumber) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active })
        this.name = name;
        this.score = 0;
        this.scoreTimer = 0;
        this.playerNumber = playerNumber
        this.lastShotTime = 0;
        this.initialX = x;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.graphics.use(Resources.Fish1.toSprite())
        this.scale = new Vector(2, 2)
        this.gravity = new Vector(0, 800)
        this.pos = new Vector(x, y)
        this.vel = new Vector(1, 0)
        this.isOnGround = true;

        this.events.on("exitviewport", (e) => this.playerTop(e))
        this.events.on("exitviewport", (e) => this.playerDown(e))


        console.log(`My name is ${this.name}`)
    }


    //on load register player collisions and score interval
    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))

        this._scoreInterval = setInterval(() => {
            this.addScore();
        }, 1000);
    }


    //check collisions between players and other objects
    hitSomething(event) {
        if (event.other.owner instanceof Floor) {
            this.isOnGround = true;
        }
        if (event.other.owner instanceof Fish) {
            event.other.owner.diedByPlayer();
            Resources.Crunch.play(0.5);

        }
    }


    //check timer if last bullet not longer than 1100 ago shoot + reset timer
    shoot() {
        const now = Date.now()
        if (now - this.lastShotTime >= 1100) {
            this.scene.add(new Arrow(this.pos.x + 10, this.pos.y + 10))
            this.lastShotTime = now;
        }
    }


    //if on ground jump and reset on ground status
    jump() {
        if (this.isOnGround) {
            this.body.applyLinearImpulse(new Vector(0, -10000));
            this.isOnGround = false;
        }
    }


    //add points and to scoreboard
    addScore() {
        this.score++;
        if (this.scene.engine.ui) {
            this.scene.engine.ui.showScore(this.playerNumber, this.score);
        }
    }



    onPreUpdate(engine) {
        let kb = engine.input.keyboard
        this.pos.x = this.initialX;

        //simpel shooting
        if (this.playerNumber === 1 && kb.wasPressed(Keys.E)) {
            this.shoot()
        }
        if (this.playerNumber === 2 && kb.wasPressed(Keys.Enter)) {
            this.shoot()
        }

        if (this.playerNumber === 1 && kb.wasPressed(Keys.Space)) {
            this.jump()
        }

        if (this.playerNumber === 2 && kb.wasPressed(Keys.ShiftRight)) {
            this.jump()
        }

    }


    //out of screen up reset
    playerTop(e) {
        this.pos = new Vector(this.initialX, 900)
    }


    //out of screen down reset
    playerDown(e) {
        this.pos = new Vector(this.initialX, 900)
    }
}