import { FanHeater } from '../types/FanHeater'

export class FanHeaterTable {
    private fanHeaters: Map<string, FanHeater>

    constructor() {
        this.fanHeaters = new Map()
    }

    createFanHeater(fanHeater: FanHeater) {
        this.fanHeaters.set(fanHeater.product_id, fanHeater)
    }

    getFanHeater(product_id: string): FanHeater | undefined {
        return this.fanHeaters.get(product_id)
    }

    removeFanHeater(product_id: string) {
        this.fanHeaters.delete(product_id)
    }
}
