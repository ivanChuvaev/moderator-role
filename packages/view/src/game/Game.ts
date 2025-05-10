import { Engine } from '@model/Engine'
import { PersonType } from '@model/enums/PersonType'
import { ProductCategory } from '@model/enums/ProductCategory'
import { ScenarioEntryType } from '@model/enums/ScenarioEntryType'
import { Sex } from '@model/enums/Sex'

export class Game {
    private engine: Engine
    private interval: number

    constructor() {
        this.engine = new Engine()
        this.interval = 0
    }

    initialize() {
        this.engine.reset()

        const seller = this.engine.createPerson({
            type: PersonType.SELLER,
            firstName: 'Adam',
            lastName: 'Smith',
            middleName: 'Alexandrovich',
            sex: Sex.MALE,
            disputeFactor: 0.5,
            avatarSrc: null,
        })

        this.engine.createProduct({
            category: ProductCategory.REFRIGERATOR,
            name: 'Refrigerator',
            price: 100,
            sellerId: seller.id,
            width: 100,
            height: 100,
            depth: 100,
            volume: 100,
            mass: 100,
            dispute: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Ты чего меня отменил?',
                children: [],
            },
        })
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
