import { Seller } from '../types/Seller'

export class SellerTable {
    private sellers: Map<string, Seller>

    constructor() {
        this.sellers = new Map()
    }

    createSeller(seller: Seller) {
        this.sellers.set(seller.personId, seller)
    }

    getSeller(personId: string) {
        return this.sellers.get(personId)
    }

    removeSeller(personId: string) {
        this.sellers.delete(personId)
    }

    serialize() {
        return Array.from(this.sellers.values())
    }

    parse(sellers: Seller[]) {
        this.sellers = new Map(
            sellers.map((seller) => [seller.personId, seller])
        )
    }
}
