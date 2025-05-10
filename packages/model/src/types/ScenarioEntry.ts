import { ScenarioEntryType } from '../enums/ScenarioEntryType'

export type ScenarioEntry = {
    id: string
    type: ScenarioEntryType
    productId: string
    parentId: string | null
    text: string
}
