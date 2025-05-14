import { ScenarioEntryType } from '../enums/ScenarioEntryType'

type ScenarioEntryCommon = {
    id: string
    productId: string
    parentId: string | null
}

type ScenarioEntrySellerDefend = ScenarioEntryCommon & {
    type: ScenarioEntryType.SELLER_DEFEND
    text: string
    admit?: ScenarioEntryModeratorAdmit
    defend?: ScenarioEntryModeratorDefend
}

type ScenarioEntrySellerAdmit = ScenarioEntryCommon & {
    type: ScenarioEntryType.SELLER_ADMIT
    text: string
}

type ScenarioEntrySellerIgnore = ScenarioEntryCommon & {
    type: ScenarioEntryType.SELLER_IGNORE
}

type ScenarioEntryModeratorAdmit = ScenarioEntryCommon & {
    type: ScenarioEntryType.MODERATOR_ADMIT
    text: string
}

type ScenarioEntryModeratorDefend = ScenarioEntryCommon & {
    type: ScenarioEntryType.MODERATOR_DEFEND
    text: string
    reply:
        | ScenarioEntrySellerDefend
        | ScenarioEntrySellerAdmit
        | ScenarioEntrySellerIgnore
}

export type ScenarioEntry =
    | ScenarioEntrySellerDefend
    | ScenarioEntrySellerAdmit
    | ScenarioEntrySellerIgnore
    | ScenarioEntryModeratorAdmit
    | ScenarioEntryModeratorDefend
