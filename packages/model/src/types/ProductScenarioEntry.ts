import { ScenarioEntry } from './ScenarioEntry'
import { ScenarioEntryType } from '../enums/ScenarioEntryType'

type ProductScenarioEntrySellerDefend = Omit<
    Extract<ScenarioEntry, { type: ScenarioEntryType.SELLER_DEFEND }>,
    'id' | 'productId' | 'parentId' | 'admit' | 'defend'
> & {
    admit?: ProductScenarioEntryModeratorAdmit
    defend?: ProductScenarioEntryModeratorDefend
}

type ProductScenarioEntrySellerAdmit = Omit<
    Extract<ScenarioEntry, { type: ScenarioEntryType.SELLER_ADMIT }>,
    'id' | 'productId' | 'parentId'
>

type ProductScenarioEntrySellerIgnore = Omit<
    Extract<ScenarioEntry, { type: ScenarioEntryType.SELLER_IGNORE }>,
    'id' | 'productId' | 'parentId'
>

type ProductScenarioEntryModeratorAdmit = Omit<
    Extract<ScenarioEntry, { type: ScenarioEntryType.MODERATOR_ADMIT }>,
    'id' | 'productId' | 'parentId'
>

type ProductScenarioEntryModeratorDefend = Omit<
    Extract<ScenarioEntry, { type: ScenarioEntryType.MODERATOR_DEFEND }>,
    'id' | 'productId' | 'parentId' | 'reply'
> & {
    reply:
        | ProductScenarioEntrySellerDefend
        | ProductScenarioEntrySellerAdmit
        | ProductScenarioEntrySellerIgnore
}

export type ProductScenarioEntry =
    | ProductScenarioEntrySellerDefend
    | ProductScenarioEntrySellerAdmit
    | ProductScenarioEntrySellerIgnore
    | ProductScenarioEntryModeratorAdmit
    | ProductScenarioEntryModeratorDefend
