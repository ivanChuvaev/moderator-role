import { v4 as uuidv4 } from 'uuid'

import { ScenarioEntry } from '../types/ScenarioEntry'

export class ScenarioEntryTable {
    private scenarioEntries: Map<string, ScenarioEntry> = new Map()

    constructor() {
        this.scenarioEntries = new Map()
    }

    createScenarioEntry(
        scenario_entry: Omit<ScenarioEntry, 'id'>
    ): ScenarioEntry {
        const newScenarioEntry: ScenarioEntry = {
            ...scenario_entry,
            id: uuidv4(),
        }
        this.scenarioEntries.set(newScenarioEntry.id, newScenarioEntry)
        return newScenarioEntry
    }

    getScenarioEntry(scenario_entry_id: string): ScenarioEntry | undefined {
        return this.scenarioEntries.get(scenario_entry_id)
    }

    getProductStartScenarioEntry(
        product_id: string
    ): ScenarioEntry | undefined {
        return Array.from(this.scenarioEntries.values()).find(
            (scenarioEntry) =>
                scenarioEntry.product_id === product_id &&
                scenarioEntry.parent_id === null
        )
    }

    getScenarioEntryChildren(scenario_entry_id: string): ScenarioEntry[] {
        return Array.from(this.scenarioEntries.values()).filter(
            (scenarioEntry) => scenarioEntry.parent_id === scenario_entry_id
        )
    }
}
