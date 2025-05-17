import { FanHeater } from '../types/FanHeater'

export const fanHeaterRestrictions: Partial<Record<keyof FanHeater, any>> = {
    area: {
        min: 5,
        max: 15,
    },
    mass: {
        min: 0.2,
        max: 1.2,
    },
    power: {
        min: 500,
        max: 1500,
    },
    maxTemperature: {
        min: 70,
        max: 150,
    },
    width: {
        min: 10,
        max: 25,
    },
    height: {
        min: 15,
        max: 35,
    },
    depth: {
        min: 10,
        max: 25,
    },
}

export class FanHeaterTable {
    private fanHeaters: Map<string, FanHeater>

    constructor() {
        this.fanHeaters = new Map()
    }

    createFanHeater(fanHeater: FanHeater) {
        this.fanHeaters.set(fanHeater.productId, fanHeater)
    }

    getFanHeater(productId: string): FanHeater | undefined {
        return this.fanHeaters.get(productId)
    }

    removeFanHeater(productId: string) {
        this.fanHeaters.delete(productId)
    }

    isCorrect(productId: string): boolean {
        const fanHeater = this.getFanHeater(productId)
        if (!fanHeater) return false

        return Object.entries(fanHeaterRestrictions).every(
            ([key, restriction]) => {
                const fanHeaterValue = fanHeater[
                    key as keyof FanHeater
                ] as number
                return (
                    fanHeaterValue >= restriction.min &&
                    fanHeaterValue <= restriction.max
                )
            }
        )
    }

    serialize() {
        return Array.from(this.fanHeaters.values())
    }

    parse(fanHeaters: FanHeater[]) {
        this.fanHeaters = new Map(
            fanHeaters.map((fanHeater) => [fanHeater.productId, fanHeater])
        )
    }
}
