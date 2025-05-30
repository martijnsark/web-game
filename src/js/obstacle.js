import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur"


export class Obstacle extends Actor {

    //constructor for obstakels (default features)
    constructor(x, y, sprite) {
        super({
            width: 100,
            height: 100,
            collisionType: CollisionType.Active
        })
        this.vel = new Vector(-300, 0)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.friction = 0;
        if (sprite) {
            this.graphics.use(sprite);
        }
    }

    //if obstacle is not moving reset velocity
    onPreUpdate(engine) {
        if (this.vel.x > -300) {
            this.vel = new Vector(-300, 0)
        }
    }
}