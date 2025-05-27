import { Engine } from '@model/Engine'
import { initialize } from './initialize'
import { isNil } from '@view/utils/isNil'

type ExternalStorage = {
    getState: () => string | null
    setState: (state: string | null) => void
}

export class Game {
    private engine: Engine
    private interval: number

    constructor(externalStorage?: ExternalStorage) {
        this.engine = new Engine()
        this.interval = 0

        if (externalStorage) {
            const externalStorageState = externalStorage?.getState()

            if (isNil(externalStorageState)) {
                initialize(this.engine)
            } else {
                this.engine.parse(externalStorageState)
            }

            this.engine.subscribe(() => {
                externalStorage.setState(this.engine.serialize())
            })

            return
        }

        initialize(this.engine)
    }

    restart() {
        initialize(this.engine)
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

const externalStorage: ExternalStorage = {
    getState: () => localStorage.getItem('game'),
    setState: (state) => {
        if (!state) {
            localStorage.removeItem('game')
        } else {
            localStorage.setItem('game', state)
        }
    },
}

export const game = new Game(externalStorage)
