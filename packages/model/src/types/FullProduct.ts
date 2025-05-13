import { ProductRefrigerator } from './ProductRefrigerator'
import { ProductLaptop } from './ProductLaptop'
import { ProductMicrowave } from './ProductMicrowave'
import { ProductFanHeater } from './ProductFanHeater'
import { Prettify } from './utils'
import { PersonSeller } from './PersonSeller'
import { Tag } from './Tag'
import { PersonModerator } from './PersonModerator'

export type FullProduct = {
    seller: PersonSeller
    moderator: PersonModerator | null
    images: string[]
    tags: Tag[]
    hasMessages: boolean
} & (
    | Prettify<ProductRefrigerator>
    | Prettify<ProductLaptop>
    | Prettify<ProductMicrowave>
    | Prettify<ProductFanHeater>
)
