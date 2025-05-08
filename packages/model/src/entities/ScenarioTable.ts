import { Scenario } from '../types/Scenario'

export class ScenarioTable {
    private scenarios: Scenario[] = []

    constructor() {
        this.scenarios = []
    }

    createScenario(product_id: string) {
        const scenario: Scenario = {
            product_id,
            last_scenario_entry_id: null,
            last_timestamp: null,
            ignore: null,
        }
        this.scenarios.push(scenario)
    }

    getFreeScenarios() {
        return this.scenarios.filter(
            (scenario) =>
                scenario.ignore === null &&
                scenario.last_scenario_entry_id === null &&
                scenario.last_timestamp == null
        )
    }

    getScenarios() {
        return this.scenarios
    }

    getScenario(product_id: string) {
        return this.scenarios.find(
            (scenario) => scenario.product_id === product_id
        )
    }

    updateScenario(scenario: Scenario) {
        const index = this.scenarios.findIndex(
            (s) => s.product_id === scenario.product_id
        )
        if (index !== -1) {
            this.scenarios[index] = scenario
        }
    }
}
