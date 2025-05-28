import { Microwave } from '../types/Microwave'

export const microwaveRestrictions: Partial<
    Record<keyof Microwave, { min: number; max: number; translation: string }>
> = {
    volume: {
        translation: 'Объем',
        min: 20,
        max: 30,
    },
    mass: {
        translation: 'Масса',
        min: 8,
        max: 20,
    },
    power: {
        translation: 'Мощность',
        min: 800,
        max: 1800,
    },
    microwaveFrequency: {
        translation: 'Частота',
        min: 2400,
        max: 2500,
    },
    width: {
        translation: 'Ширина',
        min: 44,
        max: 55,
    },
    height: {
        translation: 'Высота',
        min: 30,
        max: 45,
    },
    depth: {
        translation: 'Глубина',
        min: 25,
        max: 35,
    },
}
export class MicrowaveTable {
    private microwaves: Map<string, Microwave>

    constructor() {
        this.microwaves = new Map()
    }

    createMicrowave(microwave: Microwave) {
        this.microwaves.set(microwave.productId, microwave)
    }

    getMicrowave(productId: string): Microwave | undefined {
        return this.microwaves.get(productId)
    }

    removeMicrowave(productId: string) {
        this.microwaves.delete(productId)
    }

    getWrongFields(productId: string) {
        const microwave = this.getMicrowave(productId)
        if (!microwave) return []

        let wrongFields: string[] = []

        for (const [key, restriction] of Object.entries(
            microwaveRestrictions
        )) {
            const microwaveValue = microwave[key as keyof Microwave] as number

            const isCorrect =
                microwaveValue >= restriction.min &&
                microwaveValue <= restriction.max

            if (!isCorrect) {
                wrongFields.push(key)
            }
        }

        return wrongFields
    }

    isCorrect(productId: string): boolean {
        const microwave = this.getMicrowave(productId)
        if (!microwave) return false

        return Object.entries(microwaveRestrictions).every(
            ([key, restriction]) => {
                const microwaveValue = microwave[
                    key as keyof Microwave
                ] as number
                return (
                    microwaveValue >= restriction.min &&
                    microwaveValue <= restriction.max
                )
            }
        )
    }

    serialize() {
        return Array.from(this.microwaves.values())
    }

    parse(microwaves: Microwave[]) {
        this.microwaves = new Map(
            microwaves.map((microwave) => [microwave.productId, microwave])
        )
    }
}
