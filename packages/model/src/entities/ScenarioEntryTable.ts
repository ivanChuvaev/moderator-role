import { v4 as uuidv4 } from 'uuid'

import { ScenarioEntry } from '../types/ScenarioEntry'

export class ScenarioEntryTable {
    private scenarioEntries: Map<string, ScenarioEntry> = new Map()

    constructor() {
        this.scenarioEntries = new Map()
    }

    createScenarioEntry(
        scenarioEntry: Omit<ScenarioEntry, 'id'>
    ): ScenarioEntry {
        const newScenarioEntry: ScenarioEntry = {
            ...scenarioEntry,
            id: uuidv4(),
        }
        this.scenarioEntries.set(newScenarioEntry.id, newScenarioEntry)
        return newScenarioEntry
    }

    getScenarioEntry(scenarioEntryId: string): ScenarioEntry | undefined {
        return this.scenarioEntries.get(scenarioEntryId)
    }

    getProductStartScenarioEntry(productId: string): ScenarioEntry | undefined {
        return Array.from(this.scenarioEntries.values()).find(
            (scenarioEntry) =>
                scenarioEntry.productId === productId &&
                scenarioEntry.parentId === null
        )
    }

    getScenarioEntryChildren(scenarioEntryId: string): ScenarioEntry[] {
        return Array.from(this.scenarioEntries.values()).filter(
            (scenarioEntry) => scenarioEntry.parentId === scenarioEntryId
        )
    }

    serialize() {
        return Array.from(this.scenarioEntries.values())
    }

    parse(scenarioEntries: ScenarioEntry[]) {
        this.scenarioEntries = new Map(
            scenarioEntries.map((scenarioEntry) => [
                scenarioEntry.id,
                scenarioEntry,
            ])
        )
    }
}
