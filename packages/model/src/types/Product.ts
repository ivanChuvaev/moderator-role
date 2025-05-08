import { ProductCategory } from '../enums/ProductCategory'
import { ProductStatus } from '../enums/ProductStatus'

export type Product = {
    category: ProductCategory
    id: string
    moderator_id: string | null
    name: string
    price: number
    seller_id: string
    status: ProductStatus
}
