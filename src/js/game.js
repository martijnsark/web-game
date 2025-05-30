import '../css/style.css'
import { Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { ResourceLoader } from './resources.js'
import { Level1 } from './level1.js';
import { GameOver } from './gameover.js';

export class Game extends Engine {


    constructor() {
        super({
            width: 1530,
            height: 1024,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800),
            }
        })
        this.start(ResourceLoader).then(() => this.#startGame())
        this.showDebug(true)
    }

    #startGame() {
        this.add('level1', new Level1());
        this.add('gameover', new GameOver());
        this.goToScene('level1');
    }
}

new Game()
