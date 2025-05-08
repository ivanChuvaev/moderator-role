import { ScenarioEntryType } from '../enums/ScenarioEntryType'

export type ScenarioEntry = {
    id: string
    type: ScenarioEntryType
    product_id: string
    parent_id: string | null
    text: string
}
