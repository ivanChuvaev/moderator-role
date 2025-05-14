import { Engine } from '@model/Engine'
import { scenarioA } from './scenarios/scenarioA'

export const initialize = (engine: Engine) => {
    engine.reset()
    scenarioA(engine)
}
