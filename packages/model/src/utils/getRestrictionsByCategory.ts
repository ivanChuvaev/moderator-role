import { fanHeaterRestrictions } from '../entities/FanHeaterTable'
import { laptopRestrictions } from '../entities/LaptopTable'
import { microwaveRestrictions } from '../entities/MicrowaveTable'
import { refrigeratorRestrictions } from '../entities/RefrigeratorTable'
import { ProductCategory } from '../enums/ProductCategory'

export const getRestrictionsByCategory = (
    category: ProductCategory
): Record<string, { min: number; max: number }> => {
    switch (category) {
        case ProductCategory.LAPTOP:
            return laptopRestrictions
        case ProductCategory.MICROWAVE:
            return microwaveRestrictions
        case ProductCategory.REFRIGERATOR:
            return refrigeratorRestrictions
        case ProductCategory.FAN_HEATER:
            return fanHeaterRestrictions
        default:
            return {}
    }
}
