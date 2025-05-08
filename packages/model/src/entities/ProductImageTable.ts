import { ProductImage } from '../types/ProductImage'

export class ProductImageTable {
    private productImages: Map<string, ProductImage[]>

    constructor() {
        this.productImages = new Map()
    }

    addImageToProduct(productId: string, image: ProductImage): void {
        const prev = this.productImages.get(productId) ?? []
        this.productImages.set(productId, [...prev, image])
    }

    getImagesOfProduct(productId: string): string[] {
        return (
            this.productImages.get(productId)?.map((image) => image.src) ?? []
        )
    }

    removeImageFromProduct(productId: string, imageId: string): void {
        const prev = this.productImages.get(productId)
        if (prev) {
            if (prev.length <= 1) {
                this.productImages.delete(productId)
            } else {
                this.productImages.set(
                    productId,
                    prev.filter((image) => image.id !== imageId)
                )
            }
        }
    }
}
