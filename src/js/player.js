import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom, Timer } from "excalibur"
import { Resources, ResourceLoader, } from './resources.js'
import { Arrow } from './Arrow.js'
import { Floor } from './Floor.js'
import { Fish } from './fish.js'
import { Heart } from "./heart.js"



export class Player extends Actor {


    //traits (these get rememberd)
    score
    lives
    playerNumber
    isOnGround
    scoreFrameCounter


    //constructor for players (default features)
    constructor(x, y, playerNumber) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active })

        //important requirements for a Actor
        this.scale = new Vector(1.5, 1.5)
        this.pos = new Vector(x, y)

        //score variables
        this.score = 0;

        //lives
        this.lives = 3;

        //player identifier
        this.playerNumber = playerNumber;

        //sprite(s)
        this.graphics.use(Resources.Fish1.toSprite());

        //restrictions
        this.initialX = x;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        //physics
        this.gravity = new Vector(0, 800);
        this.bounciness = 1;

        //player status
        this.isOnGround = true;
        this.canShoot = true;

        //timers
        this.scoreFrameCounter = 0
        this.shootCooldownTimer = null;

        //shooting
        this.canShoot = true;

        //activate events if user leaves screen (just in case)
        this.events.on("exitviewport", (e) => this.playerTop(e))
        this.events.on("exitviewport", (e) => this.playerDown(e))
    }


    //on load register player collisions and player shoot cooldown
    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))

        this.shootCooldownTimer = new Timer({
            fcn: () => { this.canShoot = true; },
            interval: 5000,
            repeats: false
        });
        engine.currentScene.add(this.shootCooldownTimer);
    }


    //check collisions between players and other objects
    hitSomething(event) {
        if (event.other.owner instanceof Floor) {
            this.isOnGround = true;
        }
        if (event.other.owner instanceof Fish) {
            event.other.owner.diedByPlayer();
            this.removeLives();
            this.playerDied();
        }
        if (event.other.owner instanceof Heart) {
            event.other.owner.diedByPlayer();
            if (this.lives < 3) {
                this.addLives();
            }
        }
    }


    //shoot arrow
    shoot() {
        this.scene.add(new Arrow(this.pos.x + 10, this.pos.y + 10))
    }


    //if on ground jump and reset on ground status
    jump() {
        if (this.isOnGround) {
            this.body.applyLinearImpulse(new Vector(0, -10000));
            this.isOnGround = false;
        }
    }


    //add points to correct player and to the correct label
    addScore() {
        this.score++;
        if (this.playerNumber === 1 && this.scene.scoreLabel1) {
            this.scene.scoreLabel1.updateScore(this.score);
        }
        if (this.playerNumber === 2 && this.scene.scoreLabel2) {
            this.scene.scoreLabel2.updateScore(this.score);
        }
    }


    //add lives to correct player and to the correct label
    addLives() {
        this.lives++;
        if (this.playerNumber === 1 && this.scene.liveTracker1) {
            this.scene.liveTracker1.updateLives(this.lives);
        }
        if (this.playerNumber === 2 && this.scene.liveTracker2) {
            this.scene.liveTracker2.updateLives(this.lives);
        }
    }


    //remove lives to correct player and to the correct label
    removeLives() {
        this.lives--;
        if (this.playerNumber === 1 && this.scene.liveTracker1) {
            this.scene.liveTracker1.updateLives(this.lives);
        }
        if (this.playerNumber === 2 && this.scene.liveTracker2) {
            this.scene.liveTracker2.updateLives(this.lives);
        }
    }

    playerDied() {
        if (this.lives === 0) {
            this.kill();
            if (this.scene.playerDied) {
                this.scene.playerDied();
            }
        }
    }




    onPreUpdate(engine) {
        let kb = engine.input.keyboard
        this.pos.x = this.initialX;

        //simpel shooting based on player and controles
        if (this.playerNumber === 1 && kb.wasPressed(Keys.E) && this.canShoot) {
            this.shoot();
            this.canShoot = false;
            this.shootCooldownTimer.reset();
            this.shootCooldownTimer.start();
        }

        if (this.playerNumber === 2 && kb.wasPressed(Keys.Enter) && this.canShoot) {
            this.shoot();
            this.canShoot = false;
            this.shootCooldownTimer.reset();
            this.shootCooldownTimer.start();
        }

        //simpel jumping based on player and controles + collision with ground
        if (this.playerNumber === 1 && kb.wasPressed(Keys.Space)) {
            this.jump()
        }

        if (this.playerNumber === 2 && kb.wasPressed(Keys.ShiftRight)) {
            this.jump()
        }
    }

    //update player score based on framerate
    onPostUpdate(engine) {
        this.scoreFrameCounter++
        if (this.scoreFrameCounter > 60) {
            this.addScore();
            this.scoreFrameCounter = 0
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