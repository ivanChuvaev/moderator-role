import { Laptop } from '../types/Laptop'

export const laptopRestrictions: Partial<
    Record<keyof Laptop, { min: number; max: number; translation: string }>
> = {
    diagonal: {
        translation: 'Диагональ',
        min: 13,
        max: 17,
    },
    storage: {
        translation: 'Объем памяти',
        min: 256,
        max: 2048,
    },
    ram: {
        translation: 'Оперативная память',
        min: 8,
        max: 32,
    },
    mass: {
        translation: 'Масса',
        min: 1,
        max: 3,
    },
    power: {
        translation: 'Мощность',
        min: 30,
        max: 90,
    },
    width: {
        translation: 'Ширина',
        min: 30,
        max: 40,
    },
    height: {
        translation: 'Высота',
        min: 1.3,
        max: 3,
    },
}

export class LaptopTable {
    private laptops: Map<string, Laptop>

    constructor() {
        this.laptops = new Map()
    }

    createLaptop(laptop: Laptop) {
        this.laptops.set(laptop.productId, laptop)
    }

    getLaptop(productId: string): Laptop | undefined {
        return this.laptops.get(productId)
    }

    removeLaptop(productId: string) {
        this.laptops.delete(productId)
    }

    isCorrect(productId: string): boolean {
        const laptop = this.getLaptop(productId)
        if (!laptop) return false

        return Object.entries(laptopRestrictions).every(
            ([key, restriction]) => {
                const laptopValue = laptop[key as keyof Laptop] as number
                return (
                    laptopValue >= restriction.min &&
                    laptopValue <= restriction.max
                )
            }
        )
    }

    serialize() {
        return Array.from(this.laptops.values())
    }

    parse(laptops: Laptop[]) {
        this.laptops = new Map(
            laptops.map((laptop) => [laptop.productId, laptop])
        )
    }
}
