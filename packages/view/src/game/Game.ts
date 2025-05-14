import { Engine } from '@model/Engine'
import { initialize } from './initialize'

export class Game {
    private engine: Engine
    private interval: number

    constructor() {
        this.engine = new Engine()
        this.interval = 0
    }

    initialize() {
        initialize(this.engine)
    }

    restart() {
        this.initialize()
        this.stop()
        this.start()
    }

    start() {
        this.interval = window.setInterval(() => this.tick(), 3000)
    }

    stop() {
        clearInterval(this.interval)
    }

    subscribe(callback: (data: any) => void) {
        this.engine.subscribe(callback)
    }

    unsubscribe(callback: (data: any) => void) {
        this.engine.unsubscribe(callback)
    }

    select(selector: (engine: Engine) => any) {
        return selector(this.engine)
    }

    private tick() {
        this.engine.tick()
    }
}

export const game = new Game()
game.initialize()
