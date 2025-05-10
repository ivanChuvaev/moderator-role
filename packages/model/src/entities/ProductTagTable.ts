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
            productId: productId,
            tagId: tagId,
        })
    }

    removeTagFromProduct(productId: string, tagId: string) {
        this.productTags = this.productTags.filter(
            (tag) => tag.productId !== productId && tag.tagId !== tagId
        )
    }

    getTagIdsOfProduct(productId: string): string[] {
        return this.productTags
            .filter((tag) => tag.productId === productId)
            .map((tag) => tag.tagId)
    }

    getProductIdsOfTag(tagId: string): string[] {
        return this.productTags
            .filter((tag) => tag.tagId === tagId)
            .map((tag) => tag.productId)
    }

    serialize() {
        return this.productTags
    }

    parse(productTags: ProductTag[]) {
        this.productTags = productTags
    }
}
