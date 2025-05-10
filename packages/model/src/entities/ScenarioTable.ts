import { Scenario } from '../types/Scenario'

export class ScenarioTable {
    private scenarios: Scenario[] = []

    constructor() {
        this.scenarios = []
    }

    createScenario(productId: string) {
        const scenario: Scenario = {
            productId: productId,
            lastScenarioEntryId: null,
            lastTimestamp: null,
            ignore: null,
        }
        this.scenarios.push(scenario)
    }

    getFreeScenarios() {
        return this.scenarios.filter(
            (scenario) =>
                scenario.ignore === null &&
                scenario.lastScenarioEntryId === null &&
                scenario.lastTimestamp == null
        )
    }

    getScenarios() {
        return this.scenarios
    }

    getScenario(productId: string) {
        return this.scenarios.find(
            (scenario) => scenario.productId === productId
        )
    }

    updateScenario(scenario: Scenario) {
        const index = this.scenarios.findIndex(
            (s) => s.productId === scenario.productId
        )
        if (index !== -1) {
            this.scenarios[index] = scenario
        }
    }

    serialize() {
        return this.scenarios
    }

    parse(scenarios: Scenario[]) {
        this.scenarios = scenarios
    }
}
