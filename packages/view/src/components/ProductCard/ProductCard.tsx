import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../Button'

import styles from './ProductCard.module.scss'
import { FullProduct } from '@model'
import { translateProductStatus, translateProductCategory } from '@model'
import { Paper } from '@view/ui/Paper'

interface ProductCardProps {
    product: FullProduct
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const { product } = props
    return (
        <Paper className={styles['product-card']}>
            <Link to={`/product/${product.id}`}>
                <img
                    className={styles.image}
                    src={product.images[0] ?? '/images/empty.png'}
                    alt="product"
                />
            </Link>
            <div className={styles.info}>
                <div className={styles['info__header']}>
                    <h3 className={styles['info__name']}>{product.name}</h3>
                    <div className={styles['info__status']}>
                        {translateProductStatus(product.status)}
                    </div>
                </div>
                <div className={styles['info__details']}>
                    <div className={styles['info__category']}>
                        {translateProductCategory(product.category)}
                    </div>
                    {product.tags && product.tags.length > 0 && (
                        <div className={styles['info__tags']}>
                            {product.tags.join(', ')}
                        </div>
                    )}
                </div>
                <div className={styles['info__seller']}>
                    {product.seller.firstName} {product.seller.lastName}
                </div>
                <div className={styles['info__actions']}>
                    {product.hasMessages && (
                        <Link to={`/chats/${product.id}`}>
                            <Button>Чат</Button>
                        </Link>
                    )}
                    <Button variant="secondary">Отложить</Button>
                </div>
            </div>
        </Paper>
    )
}
