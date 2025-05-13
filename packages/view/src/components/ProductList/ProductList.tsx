import { FC } from 'react'

import { ProductCard } from '../ProductCard'

import styles from './ProductList.module.scss'
import { useGameData } from '@view/hooks/useGameData'

type ProductListProps = {
    className?: string
}

export const ProductList: FC<ProductListProps> = (props) => {
    const { className } = props
    const products = useGameData((engine) => engine.getFullProducts())

    return (
        <div className={className}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
