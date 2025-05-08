import { v4 as uuidv4 } from 'uuid'

import { ProductStatus } from '../enums/ProductStatus'
import { Product } from '../types/Product'
import { Prettify } from '../types/utils'

export class ProductTable {
    private products: Map<string, Product>

    constructor() {
        this.products = new Map()
    }

    createProduct(
        product: Prettify<Omit<Product, 'id' | 'moderator_id' | 'status'>>
    ): Product {
        const newProduct = {
            ...product,
            status: ProductStatus.PENDING,
            moderator_id: null,
            id: uuidv4(),
        }
        this.products.set(newProduct.id, newProduct)
        return newProduct
    }

    getProducts(): Product[] {
        return Array.from(this.products.values())
    }

    getProduct(productId: string): Product | undefined {
        return this.products.get(productId)
    }

    removeProduct(productId: string): void {
        this.products.delete(productId)
    }

    getRejectedProducts(): Product[] {
        return Array.from(this.products.values()).filter(
            (product) => product.status === ProductStatus.REJECTED
        )
    }
}
