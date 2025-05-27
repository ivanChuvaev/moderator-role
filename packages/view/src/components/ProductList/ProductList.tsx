import { FC } from 'react'

import { ProductCard } from '../ProductCard'

import { useGameData } from '@view/hooks/useGameData'
import { filterProducts } from '@view/helpers/filterProducts'

type ProductListProps = {
    className?: string
    filters: any
}

export const ProductList: FC<ProductListProps> = (props) => {
    const { className, filters } = props

    const products = useGameData(
        (engine) => filterProducts(engine.getFullProducts(), filters),
        [filters]
    )

    return (
        <div className={className}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
