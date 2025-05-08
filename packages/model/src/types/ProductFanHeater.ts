import { ProductCategory } from '../enums/ProductCategory'

import { FanHeater } from './FanHeater'
import { Product } from './Product'
import { Prettify } from './utils'

export type ProductFanHeater = Prettify<
    Omit<Product, 'category'> & { category: ProductCategory.FAN_HEATER } & Omit<
            FanHeater,
            'product_id'
        >
>
