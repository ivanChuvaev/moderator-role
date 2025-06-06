import { Refrigerator } from '../types/Refrigerator'

export const refrigeratorRestrictions: Partial<
    Record<
        keyof Refrigerator,
        { min: number; max: number; translation: string }
    >
> = {
    width: {
        translation: 'Ширина',
        min: 50,
        max: 70,
    },
    height: {
        translation: 'Высота',
        min: 140,
        max: 180,
    },
    depth: {
        translation: 'Глубина',
        min: 50,
        max: 70,
    },
    volume: {
        translation: 'Объем',
        min: 100,
        max: 400,
    },
    mass: {
        translation: 'Масса',
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

    getWrongFields(productId: string) {
        const refrigerator = this.getRefrigerator(productId)
        if (!refrigerator) return []

        let wrongFields: string[] = []

        for (const [key, restriction] of Object.entries(
            refrigeratorRestrictions
        )) {
            const refrigeratorValue = refrigerator[
                key as keyof Refrigerator
            ] as number

            const isCorrect =
                refrigeratorValue >= restriction.min &&
                refrigeratorValue <= restriction.max

            if (!isCorrect) {
                wrongFields.push(key)
            }
        }

        return wrongFields
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
