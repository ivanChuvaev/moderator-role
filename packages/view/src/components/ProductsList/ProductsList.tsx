import { FC } from 'react'

import { products } from '@view/mockData'
import { ProductCard } from '../ProductCard'

import styles from './ProductsList.module.scss'

interface ProductsListProps {
    onOpenChat: (productId: number) => void
}

export const ProductsList: FC<ProductsListProps> = (props) => {
    const { onOpenChat } = props
    return (
        <div className={styles.main_content}>
            <h2>Карточки товаров</h2>
            <div className={styles.products_container}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onOpenChat={() => onOpenChat(product.id)}
                    />
                ))}
            </div>
        </div>
    )
}
