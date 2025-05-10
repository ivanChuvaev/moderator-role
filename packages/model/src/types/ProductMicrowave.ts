import { ProductCategory } from '../enums/ProductCategory'

import { Microwave } from './Microwave'
import { Product } from './Product'
import { Prettify } from './utils'

export type ProductMicrowave = Prettify<
    Omit<Product, 'category'> & { category: ProductCategory.MICROWAVE } & Omit<
            Microwave,
            'productId'
        >
>
