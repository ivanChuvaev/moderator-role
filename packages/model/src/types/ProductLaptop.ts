import { ProductCategory } from '../enums/ProductCategory'

import { Laptop } from './Laptop'
import { Product } from './Product'
import { Prettify } from './utils'

export type ProductLaptop = Prettify<
    Omit<Product, 'category'> & { category: ProductCategory.LAPTOP } & Omit<
            Laptop,
            'productId'
        >
>
