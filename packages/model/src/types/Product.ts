import { ProductCategory } from '../enums/ProductCategory'
import { ProductStatus } from '../enums/ProductStatus'

export type Product = {
    category: ProductCategory
    id: string
    moderatorId: string | null
    name: string
    price: number
    sellerId: string
    status: ProductStatus
}
