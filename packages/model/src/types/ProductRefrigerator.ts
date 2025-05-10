import { ProductCategory } from '../enums/ProductCategory'

import { Product } from './Product'
import { Refrigerator } from './Refrigerator'
import { Prettify } from './utils'

export type ProductRefrigerator = Prettify<
    Omit<Product, 'category'> & {
        category: ProductCategory.REFRIGERATOR
    } & Omit<Refrigerator, 'productId'>
>
