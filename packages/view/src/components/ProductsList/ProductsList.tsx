import { FC } from 'react'

import { products } from '../../../mockData'
import ProductCard from '../ProductCard/ProductCard'

import styles from './ProductsList.module.scss'

interface ProductsListProps {
    onOpenChat: (productId: number) => void
}

const ProductsList: FC<ProductsListProps> = ({ onOpenChat }) => {
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

export default ProductsList
