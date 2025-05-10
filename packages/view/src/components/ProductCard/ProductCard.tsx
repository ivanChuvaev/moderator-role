import React from 'react'
import { Link } from 'react-router-dom'

import { Product } from '../../types/Product'
import Button from '../Button/Button'

import styles from './ProductCard.module.scss'

interface ProductCardProps {
    product: Product
    onOpenChat: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenChat }) => {
    return (
        <div className={styles.product_card_wrapper}>
            <Link to={`/product/${product.id}`}>
                <div
                    className={styles.product_image}
                    style={{ backgroundImage: `url(${product.img})` }}
                />
            </Link>
            <div className={styles.product_info}>
                <div className={styles.product_info_header}>
                    <h3 className={styles.product_name}>{product.name}</h3>
                    <span>{product.status}</span>
                </div>

                <div className={styles.product_details}>
                    <div className={styles.product_category}>
                        {product.category}
                    </div>
                    <div className={styles.product_tags}>
                        {product.tags?.join(', ')}
                    </div>
                </div>
                <div className={styles.seller}> {product.seller}</div>
                <div className={styles.product_actions}>
                    <Button label="Чат" onClick={onOpenChat} />
                    <Button label="Отложить" variant="secondary" />
                </div>
            </div>
        </div>
    )
}

export default ProductCard
