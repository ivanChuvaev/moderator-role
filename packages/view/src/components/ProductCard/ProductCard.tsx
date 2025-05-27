import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../Button'

import styles from './ProductCard.module.scss'
import { FullProduct, ProductStatus } from '@model'
import { translateProductStatus, translateProductCategory } from '@model'
import { Paper } from '@view/ui/Paper'
import { ProductCharacteristics } from '@view/pages/ProductPage/ProductCharacteristics'
import { useGameData } from '@view/hooks/useGameData'
import { useAuthorizationStorage } from '@view/storage'

interface ProductCardProps {
    product: FullProduct
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const { product } = props

    const [authorizationStore] = useAuthorizationStorage()

    const admin = useGameData((engine) =>
        authorizationStore
            ? engine.getFullAdminByLogin(authorizationStore.login)
            : null
    )

    const approveProduct = useGameData((engine) => engine.approveProduct)
    const rejectProduct = useGameData((engine) => engine.rejectProduct)

    const handleApprove = () => {
        if (!product || !admin) return
        approveProduct(product.id, admin.id)
    }

    const handleReject = () => {
        if (!product || !admin) return
        rejectProduct(product.id, admin.id)
    }

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
                <h3 className={styles['info__name']}>{product.name}</h3>
                <div className={styles['info__status']}>
                    {translateProductStatus(product.status)}
                </div>
                <div className={styles['info__category']}>
                    {translateProductCategory(product.category)}
                </div>
                {product.tags && product.tags.length > 0 && (
                    <div className={styles['info__tags']}>
                        {product.tags.join(', ')}
                    </div>
                )}
                <div className={styles['info__seller']}>
                    {product.seller.firstName} {product.seller.lastName}
                </div>
                <ProductCharacteristics
                    product={product}
                    className={styles['characteristics']}
                />
                <div className={styles['info__actions']}>
                    {product.hasMessages && (
                        <Link to={`/chats/${product.id}`}>
                            <Button>Чат</Button>
                        </Link>
                    )}
                    {!product.hasMessages &&
                        product.status === ProductStatus.PENDING && (
                            <>
                                <Button variant="danger" onClick={handleReject}>
                                    Отклонить
                                </Button>
                                <Button onClick={handleApprove}>Принять</Button>
                            </>
                        )}
                </div>
            </div>
        </Paper>
    )
}
