import { FC } from 'react'

import { products } from '../../../mockData'
import ProductCard from '../ProductCard/ProductCard'

import styles from './ProductsList.module.scss'

interface ContentProps {
    onOpenChat: () => void
}

const ProductsList: FC<ContentProps> = ({ onOpenChat }) => {
    return (
        <div className={styles.main_content}>
            <h2>Карточки товаров</h2>
            <div className={styles.products_container}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onOpenChat={onOpenChat}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsList
