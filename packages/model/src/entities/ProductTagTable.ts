import { v4 as uuidv4 } from 'uuid'

import { ProductTag } from '../types/ProductTag'

export class ProductTagTable {
    private productTags: ProductTag[]

    constructor() {
        this.productTags = []
    }

    addTagToProduct(productId: string, tagId: string) {
        this.productTags.push({
            id: uuidv4(),
            product_id: productId,
            tag_id: tagId,
        })
    }

    removeTagFromProduct(productId: string, tagId: string) {
        this.productTags = this.productTags.filter(
            (tag) => tag.product_id !== productId && tag.tag_id !== tagId
        )
    }

    getTagIdsOfProduct(productId: string): string[] {
        return this.productTags
            .filter((tag) => tag.product_id === productId)
            .map((tag) => tag.tag_id)
    }

    getProductIdsOfTag(tagId: string): string[] {
        return this.productTags
            .filter((tag) => tag.tag_id === tagId)
            .map((tag) => tag.product_id)
    }
}
