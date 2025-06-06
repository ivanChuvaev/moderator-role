import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../Button'

import styles from './ProductCard.module.scss'
import { FullProduct, ProductStatus } from '@model'
import { translateProductStatus, translateProductCategory } from '@model'
import { Paper } from '@view/ui/Paper'
import { useGameData } from '@view/hooks/useGameData'
import { useAuthorizationStorage } from '@view/storage'
import { useHintDrawer } from '@view/components/HintDrawer'
import { ProductCharacteristics } from '../ProductCharacteristic'

interface ProductCardProps {
    product: FullProduct
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const { product } = props

    const { setOpen, setCategory } = useHintDrawer()

    const [authorizationStore] = useAuthorizationStorage()

    const admin = useGameData((engine) =>
        authorizationStore
            ? engine.getFullAdminByLogin(authorizationStore.login)
            : null
    )

    const approveProduct = useGameData((engine) => engine.approveProduct)
    const rejectProduct = useGameData((engine) => engine.rejectProduct)

    const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!product || !admin) return
        approveProduct(product.id, admin.id)
    }

    const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!product || !admin) return
        rejectProduct(product.id, admin.id)
    }

    const handleOpenHint = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!product) return
        setCategory(product.category)
        setOpen(true)
    }

    return (
        <Paper className={styles['product-card']}>
            <img
                className={styles.image}
                src={product.images[0] ?? '/images/empty.png'}
                alt="product"
            />
            <div className={styles.info}>
                <h3 className={styles['info__name']}>{product.name}</h3>
                <div className={styles['info__status']}>
                    {translateProductStatus(product.status)}
                </div>
                <div className={styles['info__category']}>
                    {translateProductCategory(product.category)}
                </div>
                <div className={styles['info__price']}>{product.price}$</div>
                {product.tags && product.tags.length > 0 && (
                    <div className={styles['info__tags']}>
                        {product.tags.join(', ')}
                    </div>
                )}
                <div className={styles['info__seller']}>
                    {product.seller.firstName} {product.seller.lastName}
                </div>
                <div>
                    <ProductCharacteristics
                        product={product}
                        className={styles['characteristics']}
                    />
                    <button type="button" onClick={handleOpenHint}>
                        Подсказка
                    </button>
                </div>
                <div className={styles['info__actions']}>
                    {product.hasMessages && (
                        <Link to={`/chats/${product.id}`}>
                            <Button>Чат</Button>
                        </Link>
                    )}
                    {product.status === ProductStatus.PENDING && (
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
