import { Refrigerator } from '../types/Refrigerator'

export class RefrigeratorTable {
    private refrigerators: Map<string, Refrigerator>

    constructor() {
        this.refrigerators = new Map()
    }

    createRefrigerator(refrigerator: Refrigerator) {
        this.refrigerators.set(refrigerator.product_id, refrigerator)
    }

    getRefrigerator(product_id: string): Refrigerator | undefined {
        return this.refrigerators.get(product_id)
    }

    removeRefrigerator(product_id: string) {
        this.refrigerators.delete(product_id)
    }
}
