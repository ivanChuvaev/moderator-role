import { Seller } from '../types/Seller'

export class SellerTable {
    private sellers: Map<string, Seller>

    constructor() {
        this.sellers = new Map()
    }

    createSeller(seller: Seller) {
        this.sellers.set(seller.person_id, seller)
    }

    getSeller(person_id: string) {
        return this.sellers.get(person_id)
    }

    removeSeller(person_id: string) {
        this.sellers.delete(person_id)
    }
}
