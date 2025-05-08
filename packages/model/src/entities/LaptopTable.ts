import { Laptop } from '../types/Laptop'

export class LaptopTable {
    private laptops: Map<string, Laptop>

    constructor() {
        this.laptops = new Map()
    }

    createLaptop(laptop: Laptop) {
        this.laptops.set(laptop.product_id, laptop)
    }

    getLaptop(product_id: string): Laptop | undefined {
        return this.laptops.get(product_id)
    }

    removeLaptop(product_id: string) {
        this.laptops.delete(product_id)
    }
}
