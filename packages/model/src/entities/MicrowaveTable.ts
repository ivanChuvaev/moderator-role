import { Microwave } from '../types/Microwave'

export class MicrowaveTable {
    private microwaves: Map<string, Microwave>

    constructor() {
        this.microwaves = new Map()
    }

    createMicrowave(microwave: Microwave) {
        this.microwaves.set(microwave.product_id, microwave)
    }

    getMicrowave(product_id: string): Microwave | undefined {
        return this.microwaves.get(product_id)
    }

    removeMicrowave(product_id: string) {
        this.microwaves.delete(product_id)
    }
}
