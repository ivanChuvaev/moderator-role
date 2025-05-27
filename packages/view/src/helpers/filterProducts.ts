import { FullProduct, ProductCategory } from '@model'
import { isNil } from '@view/utils/isNil'

export type FilterProductFilters = {
    category: string | null
    price_range: [number, number]
}

export const filterProducts = (
    products: FullProduct[],
    filters: FilterProductFilters
) => {
    if (!filters || Object.keys(filters).length === 0) {
        return products
    }

    return products.filter((product) => {
        const isCategory =
            isNil(filters.category) ||
            filters.category === 'ALL' ||
            String(product.category) === filters.category
        const isPriceRange =
            isNil(filters.price_range) ||
            (product.price >= filters.price_range[0] &&
                product.price <= filters.price_range[1])

        return isCategory && isPriceRange
    })
}
