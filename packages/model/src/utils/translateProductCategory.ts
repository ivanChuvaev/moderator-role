import { ProductCategory } from '../enums/ProductCategory'

export const translateProductCategory = (category: ProductCategory) => {
    switch (category) {
        case ProductCategory.REFRIGERATOR:
            return 'Холодильник'
        case ProductCategory.LAPTOP:
            return 'Ноутбук'
        case ProductCategory.MICROWAVE:
            return 'Микроволновая печь'
        case ProductCategory.FAN_HEATER:
            return 'Фен'
        default:
            return 'Другое'
    }
}
