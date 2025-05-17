import { Refrigerator } from '../types/Refrigerator'

export const refrigeratorRestrictions: Partial<Record<keyof Refrigerator, any>> = {
    width: {
        min: 50,
        max: 70,
    },
    height: {
        min: 140,
        max: 180,
    },
    depth: {
        min: 50,
        max: 70,
    },
    volume: {
        min: 100,
        max: 400,
    },
    mass: {
        min: 30,
        max: 80,
    },
}

export class RefrigeratorTable {
    private refrigerators: Map<string, Refrigerator>

    constructor() {
        this.refrigerators = new Map()
    }

    createRefrigerator(refrigerator: Refrigerator) {
        this.refrigerators.set(refrigerator.productId, refrigerator)
    }

    getRefrigerator(productId: string): Refrigerator | undefined {
        return this.refrigerators.get(productId)
    }

    removeRefrigerator(productId: string) {
        this.refrigerators.delete(productId)
    }

    isCorrect(productId: string): boolean {
        const refrigerator = this.getRefrigerator(productId)
        if (!refrigerator) return false

        return Object.entries(refrigeratorRestrictions).every(
            ([key, restriction]) => {
                const refrigeratorValue = refrigerator[
                    key as keyof Refrigerator
                ] as number
                return (
                    refrigeratorValue >= restriction.min &&
                    refrigeratorValue <= restriction.max
                )
            }
        )
    }

    serialize() {
        return Array.from(this.refrigerators.values())
    }

    parse(refrigerators: Refrigerator[]) {
        this.refrigerators = new Map(
            refrigerators.map((refrigerator) => [
                refrigerator.productId,
                refrigerator,
            ])
        )
    }
}
