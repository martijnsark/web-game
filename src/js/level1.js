import { Scene } from "excalibur";
import { Background } from './background.js'
import { Player } from './player.js'
import { UI } from './ui.js'
import { Floor } from './Floor.js'
import { Fish } from './fish.js';
import { Heart } from './heart.js';

export class Level1 extends Scene {
    #alivePlayers

    onInitialize(engine) {
        this.#alivePlayers = 2;


        this.add(new Background(0, 514))
        this.add(new Background(1535, 514))

        this.add(new Floor(500, 1080))
        this.add(new Floor(1500, 1080))

        this.scoreLabel1 = new UI(20, 20, 1, 'Score P1: 0');
        this.scoreLabel2 = new UI(20, 60, 2, 'Score P2: 0');
        this.add(this.scoreLabel1);
        this.add(this.scoreLabel2);

        this.liveTracker1 = new UI(20, 100, 1, 'P1 remaining lives: 3');
        this.liveTracker2 = new UI(20, 140, 2, 'P2 remaining lives: 3');
        this.add(this.liveTracker1);
        this.add(this.liveTracker2);

        this.player1 = new Player(120, 900, 1);
        this.player2 = new Player(400, 900, 2);
        this.add(this.player1);
        this.add(this.player2);

        for (let i = 0; i < 1; i++) {
            this.add(new Fish());
            this.add(new Heart());
        }
    }

    playerDied() {
        this.#alivePlayers--;

        if (this.#alivePlayers <= 0) {
            this.engine.goToScene('gameover');
        }
    }

    #gameOver() {
        this.engine.goToScene('gameover')
    }
}